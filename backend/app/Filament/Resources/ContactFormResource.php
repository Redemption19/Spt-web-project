<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactFormResource\Pages;
use App\Filament\Resources\ContactFormResource\RelationManagers;
use App\Models\ContactForm;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ContactFormResource extends Resource
{
    protected static ?string $model = ContactForm::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationGroup = 'Forms & Submissions';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Contact Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('subject')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Message')
                    ->schema([
                        Forms\Components\Textarea::make('message')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Status & Processing')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(ContactForm::getStatusOptions())
                            ->required(),
                        
                        Forms\Components\Select::make('priority')
                            ->options(ContactForm::getPriorityOptions())
                            ->required(),
                        
                        Forms\Components\Select::make('source')
                            ->options(ContactForm::getSourceOptions())
                            ->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Reply Information')
                    ->schema([
                        Forms\Components\TextInput::make('replied_by')
                            ->label('Replied By'),
                        
                        Forms\Components\DateTimePicker::make('replied_at')
                            ->label('Reply Date'),
                        
                        Forms\Components\Textarea::make('reply_message')
                            ->label('Reply Message')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible()
                    ->collapsed(),

                Forms\Components\Section::make('Technical Details')
                    ->schema([
                        Forms\Components\TextInput::make('ip_address')
                            ->label('IP Address')
                            ->disabled(),
                    ])
                    ->collapsible()
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                
                Tables\Columns\TextColumn::make('subject')
                    ->searchable()
                    ->limit(40)
                    ->tooltip(function (ContactForm $record): ?string {
                        return $record->subject;
                    }),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'danger' => 'new',
                        'warning' => 'read',
                        'success' => 'replied',
                        'gray' => 'closed',
                    ])
                    ->formatStateUsing(fn (string $state): string => ContactForm::getStatusOptions()[$state] ?? $state),
                
                Tables\Columns\BadgeColumn::make('priority')
                    ->colors([
                        'gray' => 'low',
                        'info' => 'normal',
                        'warning' => 'high',
                        'danger' => 'urgent',
                    ])
                    ->formatStateUsing(fn (string $state): string => ContactForm::getPriorityOptions()[$state] ?? $state),
                
                Tables\Columns\TextColumn::make('response_time')
                    ->label('Response Time')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('replied_at')
                    ->label('Replied')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(ContactForm::getStatusOptions()),
                
                Tables\Filters\SelectFilter::make('priority')
                    ->options(ContactForm::getPriorityOptions()),
                
                Tables\Filters\SelectFilter::make('source')
                    ->options(ContactForm::getSourceOptions()),
                
                Tables\Filters\Filter::make('high_priority')
                    ->label('High Priority')
                    ->query(fn (Builder $query): Builder => $query->whereIn('priority', ['high', 'urgent'])),
                
                Tables\Filters\Filter::make('unanswered')
                    ->label('Unanswered')
                    ->query(fn (Builder $query): Builder => $query->whereIn('status', ['new', 'read'])),
            ])
            ->actions([
                Tables\Actions\Action::make('mark_read')
                    ->label('Mark as Read')
                    ->icon('heroicon-o-eye')
                    ->action(function (ContactForm $record) {
                        $record->markAsRead();
                    })
                    ->visible(fn (ContactForm $record) => $record->status === 'new'),
                
                Tables\Actions\Action::make('reply')
                    ->label('Reply')
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->form([
                        Forms\Components\Textarea::make('reply_message')
                            ->label('Reply Message')
                            ->required()
                            ->rows(5),
                    ])
                    ->action(function (ContactForm $record, array $data) {
                        $record->markAsReplied(auth()->user()->name ?? 'System', $data['reply_message']);
                    }),
                
                Tables\Actions\Action::make('set_priority')
                    ->label('Set Priority')
                    ->icon('heroicon-o-flag')
                    ->form([
                        Forms\Components\Select::make('priority')
                            ->options(ContactForm::getPriorityOptions())
                            ->required(),
                    ])
                    ->action(function (ContactForm $record, array $data) {
                        $record->setPriority($data['priority']);
                    }),
                
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('mark_read')
                        ->label('Mark as Read')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                $record->markAsRead();
                            }
                        })
                        ->icon('heroicon-o-eye'),
                    
                    Tables\Actions\BulkAction::make('set_priority')
                        ->label('Set Priority')
                        ->form([
                            Forms\Components\Select::make('priority')
                                ->options(ContactForm::getPriorityOptions())
                                ->required(),
                        ])
                        ->action(function ($records, array $data) {
                            foreach ($records as $record) {
                                $record->setPriority($data['priority']);
                            }
                        })
                        ->icon('heroicon-o-flag'),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactForms::route('/'),
            'create' => Pages\CreateContactForm::route('/create'),
            'edit' => Pages\EditContactForm::route('/{record}/edit'),
        ];
    }
}
