<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsletterSubscriptionResource\Pages;
use App\Filament\Resources\NewsletterSubscriptionResource\RelationManagers;
use App\Models\NewsletterSubscription;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsletterSubscriptionResource extends Resource
{
    protected static ?string $model = NewsletterSubscription::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Forms & Submissions';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Subscriber Information')
                    ->schema([
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('name')
                            ->maxLength(255),
                        
                        Forms\Components\Select::make('status')
                            ->options(NewsletterSubscription::getStatusOptions())
                            ->required(),
                        
                        Forms\Components\Select::make('source')
                            ->options(NewsletterSubscription::getSourceOptions())
                            ->required(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Subscription Details')
                    ->schema([
                        Forms\Components\DateTimePicker::make('subscribed_at')
                            ->required()
                            ->default(now()),
                        
                        Forms\Components\DateTimePicker::make('verified_at')
                            ->label('Verification Date'),
                        
                        Forms\Components\DateTimePicker::make('unsubscribed_at')
                            ->label('Unsubscription Date'),
                        
                        Forms\Components\TextInput::make('unsubscribe_reason')
                            ->label('Unsubscribe Reason')
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Preferences')
                    ->schema([
                        Forms\Components\KeyValue::make('preferences')
                            ->label('Newsletter Preferences')
                            ->keyLabel('Setting')
                            ->valueLabel('Value')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Technical Details')
                    ->schema([
                        Forms\Components\TextInput::make('verification_token')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('ip_address')
                            ->label('IP Address')
                            ->disabled(),
                    ])
                    ->columns(2)
                    ->collapsible()
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                
                Tables\Columns\TextColumn::make('display_name')
                    ->label('Name')
                    ->searchable(['name']),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'active',
                        'gray' => 'unsubscribed',
                        'warning' => 'bounced',
                        'danger' => 'complained',
                    ])
                    ->formatStateUsing(fn (string $state): string => NewsletterSubscription::getStatusOptions()[$state] ?? $state),
                
                Tables\Columns\IconColumn::make('is_verified')
                    ->label('Verified')
                    ->boolean(),
                
                Tables\Columns\TextColumn::make('source')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state): string => NewsletterSubscription::getSourceOptions()[$state] ?? $state),
                
                Tables\Columns\TextColumn::make('subscription_duration')
                    ->label('Duration')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('subscribed_at')
                    ->label('Subscribed')
                    ->dateTime()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('unsubscribed_at')
                    ->label('Unsubscribed')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(NewsletterSubscription::getStatusOptions()),
                
                Tables\Filters\SelectFilter::make('source')
                    ->options(NewsletterSubscription::getSourceOptions()),
                
                Tables\Filters\TernaryFilter::make('is_verified')
                    ->label('Verified')
                    ->queries(
                        true: fn (Builder $query) => $query->whereNotNull('verified_at'),
                        false: fn (Builder $query) => $query->whereNull('verified_at'),
                    ),
                
                Tables\Filters\Filter::make('active_subscribers')
                    ->label('Active Subscribers')
                    ->query(fn (Builder $query): Builder => $query->where('status', 'active')->whereNotNull('verified_at')),
                
                Tables\Filters\Filter::make('recent_subscribers')
                    ->label('Recent Subscribers (30 days)')
                    ->query(fn (Builder $query): Builder => $query->where('subscribed_at', '>=', now()->subDays(30))),
            ])
            ->actions([
                Tables\Actions\Action::make('verify')
                    ->label('Verify')
                    ->icon('heroicon-o-check-circle')
                    ->action(function (NewsletterSubscription $record) {
                        $record->verify();
                    })
                    ->visible(fn (NewsletterSubscription $record) => !$record->isVerified()),
                
                Tables\Actions\Action::make('unsubscribe')
                    ->label('Unsubscribe')
                    ->icon('heroicon-o-x-mark')
                    ->form([
                        Forms\Components\Textarea::make('reason')
                            ->label('Unsubscribe Reason')
                            ->rows(3),
                    ])
                    ->action(function (NewsletterSubscription $record, array $data) {
                        $record->unsubscribe($data['reason'] ?? null);
                    })
                    ->visible(fn (NewsletterSubscription $record) => $record->isActive()),
                
                Tables\Actions\Action::make('resubscribe')
                    ->label('Resubscribe')
                    ->icon('heroicon-o-arrow-path')
                    ->action(function (NewsletterSubscription $record) {
                        $record->resubscribe();
                    })
                    ->visible(fn (NewsletterSubscription $record) => $record->status === 'unsubscribed'),
                
                Tables\Actions\Action::make('update_preferences')
                    ->label('Preferences')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->form([
                        Forms\Components\Select::make('frequency')
                            ->options(NewsletterSubscription::getFrequencyOptions())
                            ->default('weekly'),
                        
                        Forms\Components\CheckboxList::make('topics')
                            ->options(NewsletterSubscription::getTopicOptions())
                            ->columns(2),
                    ])
                    ->action(function (NewsletterSubscription $record, array $data) {
                        $record->updatePreferences($data);
                    }),
                
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('verify_subscribers')
                        ->label('Verify Selected')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                if (!$record->isVerified()) {
                                    $record->verify();
                                }
                            }
                        })
                        ->icon('heroicon-o-check-circle'),
                    
                    Tables\Actions\BulkAction::make('unsubscribe_bulk')
                        ->label('Unsubscribe Selected')
                        ->form([
                            Forms\Components\Textarea::make('reason')
                                ->label('Unsubscribe Reason')
                                ->required()
                                ->rows(3),
                        ])
                        ->action(function ($records, array $data) {
                            foreach ($records as $record) {
                                if ($record->isActive()) {
                                    $record->unsubscribe($data['reason']);
                                }
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-x-mark'),
                ]),
            ])
            ->defaultSort('subscribed_at', 'desc');
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
            'index' => Pages\ListNewsletterSubscriptions::route('/'),
            'create' => Pages\CreateNewsletterSubscription::route('/create'),
            'edit' => Pages\EditNewsletterSubscription::route('/{record}/edit'),
        ];
    }
}
