<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventRegistrationResource\Pages;
use App\Filament\Resources\EventRegistrationResource\RelationManagers;
use App\Models\EventRegistration;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Actions\ExportAction;
use Filament\Tables\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

class EventRegistrationResource extends Resource
{
    protected static ?string $model = EventRegistration::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    
    protected static ?string $navigationGroup = 'Event Management';
    
    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Event Registrations';

    protected static ?string $pluralModelLabel = 'Event Registrations';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Registration Details')
                    ->schema([
                        Forms\Components\Select::make('event_id')
                            ->label('Event')
                            ->relationship('event', 'title')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->maxLength(20)
                            ->helperText('Include country code if international'),
                        Forms\Components\TextInput::make('organization')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('position')
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Status & Additional Information')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'confirmed' => 'Confirmed',
                                'pending' => 'Pending',
                                'cancelled' => 'Cancelled',
                                'attended' => 'Attended',
                            ])
                            ->default('confirmed')
                            ->required(),
                        Forms\Components\DateTimePicker::make('registered_at')
                            ->label('Registration Date')
                            ->default(now())
                            ->required(),
                        Forms\Components\DateTimePicker::make('checked_in_at')
                            ->label('Check-in Time')
                            ->helperText('Leave empty if not checked in'),
                        Forms\Components\Textarea::make('special_requirements')
                            ->rows(3)
                            ->columnSpanFull()
                            ->helperText('Any special requirements or accessibility needs'),
                        Forms\Components\KeyValue::make('additional_info')
                            ->label('Additional Information')
                            ->keyLabel('Field')
                            ->valueLabel('Value')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('event.title')
                    ->label('Event')
                    ->searchable()
                    ->sortable()
                    ->description(fn (EventRegistration $record): string => $record->event->formatted_date_time),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable()
                    ->icon('heroicon-o-envelope'),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable()
                    ->toggleable()
                    ->icon('heroicon-o-phone'),
                Tables\Columns\TextColumn::make('organization')
                    ->searchable()
                    ->toggleable()
                    ->limit(30),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'confirmed',
                        'warning' => 'pending',
                        'danger' => 'cancelled',
                        'info' => 'attended',
                    ])
                    ->sortable(),
                Tables\Columns\TextColumn::make('registered_at')
                    ->label('Registered')
                    ->dateTime('M j, Y g:i A')
                    ->sortable(),
                Tables\Columns\IconColumn::make('checked_in_at')
                    ->label('Checked In')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('event')
                    ->relationship('event', 'title')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'confirmed' => 'Confirmed',
                        'pending' => 'Pending',
                        'cancelled' => 'Cancelled',
                        'attended' => 'Attended',
                    ]),
                Tables\Filters\Filter::make('checked_in')
                    ->label('Checked In')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('checked_in_at')),
                Tables\Filters\Filter::make('not_checked_in')
                    ->label('Not Checked In')
                    ->query(fn (Builder $query): Builder => $query->whereNull('checked_in_at')),
            ])
            ->actions([
                Tables\Actions\Action::make('check_in')
                    ->label('Check In')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(function (EventRegistration $record) {
                        $record->checkIn();
                    })
                    ->visible(fn (EventRegistration $record): bool => 
                        $record->status === 'confirmed' && !$record->checked_in_at
                    ),
                Tables\Actions\Action::make('send_confirmation')
                    ->label('Send Confirmation')
                    ->icon('heroicon-o-envelope')
                    ->color('info')
                    ->action(function (EventRegistration $record) {
                        $record->sendConfirmationEmail();
                    }),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    BulkAction::make('export')
                        ->label('Export Selected')
                        ->icon('heroicon-o-arrow-down-tray')
                        ->action(function (Collection $records) {
                            // Implementation for CSV export
                            $csv = "Name,Email,Phone,Organization,Status,Registration Date\n";
                            foreach ($records as $record) {
                                $csv .= "{$record->name},{$record->email},{$record->phone},{$record->organization},{$record->status},{$record->registered_at}\n";
                            }
                            
                            return response()->streamDownload(function () use ($csv) {
                                echo $csv;
                            }, 'registrations.csv');
                        }),
                    BulkAction::make('confirm')
                        ->label('Confirm Selected')
                        ->icon('heroicon-o-check')
                        ->color('success')
                        ->action(function (Collection $records) {
                            $records->each->confirm();
                        }),
                    BulkAction::make('cancel')
                        ->label('Cancel Selected')
                        ->icon('heroicon-o-x-mark')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->action(function (Collection $records) {
                            $records->each->cancel();
                        }),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('registered_at', 'desc');
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
            'index' => Pages\ListEventRegistrations::route('/'),
            'create' => Pages\CreateEventRegistration::route('/create'),
            'edit' => Pages\EditEventRegistration::route('/{record}/edit'),
        ];
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}