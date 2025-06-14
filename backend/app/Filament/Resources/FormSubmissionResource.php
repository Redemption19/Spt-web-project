<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FormSubmissionResource\Pages;
use App\Filament\Resources\FormSubmissionResource\RelationManagers;
use App\Models\FormSubmission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FormSubmissionResource extends Resource
{
    protected static ?string $model = FormSubmission::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Forms & Submissions';

    protected static ?int $navigationSort = 1;

    // Permission checks
    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_forms') || auth()->user()->isSuperAdmin();
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('manage_form_submissions') || auth()->user()->isSuperAdmin();
    }

    public static function canEdit($record): bool
    {
        return auth()->user()->can('manage_form_submissions') || auth()->user()->isSuperAdmin();
    }

    public static function canDelete($record): bool
    {
        return auth()->user()->can('manage_form_submissions') || auth()->user()->isSuperAdmin();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Submission Details')
                    ->schema([
                        Forms\Components\Select::make('form_type')
                            ->label('Form Type')
                            ->options(FormSubmission::getFormTypes())
                            ->required(),
                        
                        Forms\Components\Select::make('status')
                            ->options(FormSubmission::getStatusOptions())
                            ->required(),
                        
                        Forms\Components\DateTimePicker::make('submitted_at')
                            ->required()
                            ->default(now()),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Form Data')
                    ->schema([
                        Forms\Components\KeyValue::make('form_data')
                            ->label('Submitted Data')
                            ->columnSpanFull()
                            ->keyLabel('Field')
                            ->valueLabel('Value'),
                    ]),

                Forms\Components\Section::make('Processing Information')
                    ->schema([
                        Forms\Components\TextInput::make('processed_by')
                            ->label('Processed By'),
                        
                        Forms\Components\Textarea::make('notes')
                            ->label('Processing Notes')
                            ->rows(3),
                        
                        Forms\Components\Toggle::make('email_sent')
                            ->label('Email Notification Sent')
                            ->disabled(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Technical Details')
                    ->schema([
                        Forms\Components\TextInput::make('ip_address')
                            ->label('IP Address')
                            ->disabled(),
                        
                        Forms\Components\Textarea::make('user_agent')
                            ->label('User Agent')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('pdf_path')
                            ->label('Generated PDF')
                            ->disabled(),
                    ])
                    ->columns(1)
                    ->collapsible()
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable()
                    ->searchable(),
                
                Tables\Columns\BadgeColumn::make('form_type')
                    ->label('Form Type')
                    ->colors([
                        'primary' => 'contact',
                        'success' => 'application',
                        'info' => 'feedback',
                        'warning' => 'support',
                        'danger' => 'complaint',
                    ])
                    ->formatStateUsing(fn (string $state): string => FormSubmission::getFormTypes()[$state] ?? $state),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'gray' => 'pending',
                        'warning' => 'processing',
                        'success' => 'processed',
                        'info' => 'replied',
                        'secondary' => 'archived',
                    ])
                    ->formatStateUsing(fn (string $state): string => FormSubmission::getStatusOptions()[$state] ?? $state),
                
                Tables\Columns\TextColumn::make('submitted_at')
                    ->label('Submitted')
                    ->dateTime()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('processed_by')
                    ->label('Processed By')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\IconColumn::make('email_sent')
                    ->label('Email Sent')
                    ->boolean()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\IconColumn::make('pdf_path')
                    ->label('PDF Generated')
                    ->boolean()
                    ->getStateUsing(fn ($record) => !empty($record->pdf_path)),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('form_type')
                    ->options(FormSubmission::getFormTypes()),
                
                Tables\Filters\SelectFilter::make('status')
                    ->options(FormSubmission::getStatusOptions()),
                
                Tables\Filters\Filter::make('has_pdf')
                    ->label('Has PDF')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('pdf_path')),
                
                Tables\Filters\Filter::make('email_sent')
                    ->label('Email Sent')
                    ->query(fn (Builder $query): Builder => $query->where('email_sent', true)),
            ])
            ->actions([
                Tables\Actions\Action::make('generate_pdf')
                    ->label('Generate PDF')
                    ->icon('heroicon-o-document')
                    ->action(function (FormSubmission $record) {
                        $record->generatePdf();
                    })
                    ->visible(fn (FormSubmission $record) => empty($record->pdf_path)),
                
                Tables\Actions\Action::make('download_pdf')
                    ->label('Download PDF')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->url(fn (FormSubmission $record): string => $record->pdf_url)
                    ->openUrlInNewTab()
                    ->visible(fn (FormSubmission $record) => !empty($record->pdf_path)),
                
                Tables\Actions\Action::make('send_notification')
                    ->label('Send Email')
                    ->icon('heroicon-o-envelope')
                    ->action(function (FormSubmission $record) {
                        $record->sendNotification();
                    })
                    ->visible(fn (FormSubmission $record) => !$record->email_sent),
                
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('mark_processed')
                        ->label('Mark as Processed')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                $record->markAsProcessed(auth()->user()->name ?? 'System');
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-check'),
                    
                    Tables\Actions\BulkAction::make('generate_pdfs')
                        ->label('Generate PDFs')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                if (empty($record->pdf_path)) {
                                    $record->generatePdf();
                                }
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-document'),
                ]),
            ])
            ->defaultSort('submitted_at', 'desc');
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
            'index' => Pages\ListFormSubmissions::route('/'),
            'create' => Pages\CreateFormSubmission::route('/create'),
            'edit' => Pages\EditFormSubmission::route('/{record}/edit'),
        ];
    }
}
