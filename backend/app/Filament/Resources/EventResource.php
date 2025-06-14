<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\RelationManagers;
use App\Filament\Resources\EventRegistrationResource;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    
    protected static ?string $navigationGroup = 'Event Management';
    
    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title';

    // Permission checks
    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_events') || auth()->user()->isSuperAdmin();
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_events') || auth()->user()->isSuperAdmin();
    }

    public static function canEdit($record): bool
    {
        return auth()->user()->can('edit_events') || auth()->user()->isSuperAdmin();
    }

    public static function canDelete($record): bool
    {
        return auth()->user()->can('delete_events') || auth()->user()->isSuperAdmin();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $context, $state, callable $set) {
                                if ($context === 'create') {
                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                }
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\Select::make('status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                                'cancelled' => 'Cancelled',
                                'completed' => 'Completed',
                            ])
                            ->default('draft')
                            ->required(),
                        Forms\Components\Toggle::make('is_featured')
                            ->label('Feature this event')
                            ->helperText('Featured events will be highlighted on the website'),
                    ])->columns(2),

                Forms\Components\Section::make('Event Details')
                    ->schema([
                        Forms\Components\RichEditor::make('description')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'bulletList',
                                'orderedList',
                                'link',
                            ]),
                        Forms\Components\FileUpload::make('banner')
                            ->image()
                            ->imageEditor()
                            ->directory('events/banners')
                            ->columnSpanFull(),
                        Forms\Components\DatePicker::make('date')
                            ->required()
                            ->native(false)
                            ->minDate(now()),
                        Forms\Components\TimePicker::make('time')
                            ->required()
                            ->native(false)
                            ->hoursStep(1)
                            ->minutesStep(15),
                        Forms\Components\TextInput::make('duration_minutes')
                            ->numeric()
                            ->default(60)
                            ->suffix('minutes')
                            ->minValue(15)
                            ->maxValue(480),
                        Forms\Components\DateTimePicker::make('registration_deadline')
                            ->native(false)
                            ->helperText('Optional. After this date/time, registration will be closed.'),
                    ])->columns(2),

                Forms\Components\Section::make('Location & Capacity')
                    ->schema([
                        Forms\Components\Select::make('type')
                            ->options([
                                'physical' => 'Physical Event',
                                'webinar' => 'Online Webinar',
                            ])
                            ->required()
                            ->live()
                            ->default('physical'),
                        Forms\Components\TextInput::make('venue')
                            ->required()
                            ->maxLength(255)
                            ->hidden(fn (callable $get) => $get('type') === 'webinar'),
                        Forms\Components\TextInput::make('region')
                            ->maxLength(255)
                            ->hidden(fn (callable $get) => $get('type') === 'webinar'),
                        Forms\Components\TextInput::make('registration_link')
                            ->url()
                            ->maxLength(255)
                            ->required(fn (callable $get) => $get('type') === 'webinar')
                            ->visible(fn (callable $get) => $get('type') === 'webinar'),
                        Forms\Components\TextInput::make('map_link')
                            ->url()
                            ->maxLength(255)
                            ->hidden(fn (callable $get) => $get('type') === 'webinar'),
                        Forms\Components\TextInput::make('capacity')
                            ->numeric()
                            ->default(0)
                            ->minValue(0)
                            ->required()
                            ->helperText('Set to 0 for unlimited capacity'),
                        Forms\Components\TextInput::make('price')
                            ->numeric()
                            ->prefix('GH₵')
                            ->default(0)
                            ->minValue(0)
                            ->step(0.01),
                    ])->columns(2),

                Forms\Components\Section::make('Additional Information')
                    ->schema([
                        Forms\Components\Textarea::make('requirements')
                            ->rows(3)
                            ->helperText('Any special requirements or what attendees should bring'),
                        Forms\Components\KeyValue::make('contact_info')
                            ->keyLabel('Contact Type')
                            ->valueLabel('Contact Detail')
                            ->helperText('Add contact information for inquiries')
                            ->addButtonLabel('Add Contact Info'),
                    ])->collapsible(),

                Forms\Components\Section::make('Speakers')
                    ->schema([
                        Forms\Components\Repeater::make('speakers')
                            ->relationship()
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required(),
                                Forms\Components\FileUpload::make('photo')
                                    ->image()
                                    ->directory('events/speakers'),
                                Forms\Components\Textarea::make('bio')
                                    ->rows(2),
                                Forms\Components\TextInput::make('company'),
                                Forms\Components\TextInput::make('position'),
                                Forms\Components\Toggle::make('is_keynote')
                                    ->label('Keynote Speaker'),                                Forms\Components\TextInput::make('order')
                                    ->numeric()
                                    ->default(0),
                            ])
                            ->orderable('order')
                            ->defaultItems(0)
                            ->grid(2)
                            ->columnSpanFull(),
                    ])->collapsible(),

                Forms\Components\Section::make('Agenda')
                    ->schema([
                        Forms\Components\Repeater::make('agenda')
                            ->relationship()
                            ->schema([
                                Forms\Components\TimePicker::make('time')
                                    ->required()
                                    ->native(false),
                                Forms\Components\TextInput::make('item')
                                    ->required(),
                                Forms\Components\Textarea::make('description')
                                    ->rows(2),
                                Forms\Components\TextInput::make('speaker'),
                                Forms\Components\TextInput::make('duration_minutes')
                                    ->numeric()
                                    ->default(60)
                                    ->suffix('minutes'),                                Forms\Components\Select::make('type')
                                    ->options([
                                        'presentation' => 'Presentation',
                                        'break' => 'Break',
                                        'discussion' => 'Discussion',
                                        'networking' => 'Networking',
                                        'qa' => 'Q&A Session',
                                    ])
                                    ->default('presentation'),
                                Forms\Components\TextInput::make('order')
                                    ->numeric()
                                    ->default(0)
                                    ->label('Display Order'),
                            ])
                            ->orderable('order')
                            ->defaultItems(0)
                            ->grid(2)
                            ->columnSpanFull(),
                    ])->collapsible(),            ]);
    }    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('banner')
                    ->label('Banner')
                    ->circular(false)
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50)
                    ->description(fn (Event $record): string => \Illuminate\Support\Str::limit($record->description, 100)),
                Tables\Columns\TextColumn::make('date')
                    ->label('Date & Time')
                    ->sortable()
                    ->formatStateUsing(fn (Event $record): string => $record->formatted_date_time),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'webinar' => 'info',
                        'physical' => 'success',
                    }),
                Tables\Columns\TextColumn::make('venue')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('region')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        'cancelled' => 'danger',
                        'completed' => 'info',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('capacity')
                    ->label('Capacity')
                    ->formatStateUsing(fn (Event $record): string => 
                        $record->capacity > 0 
                            ? "{$record->current_attendees}/{$record->capacity}"
                            : "∞")
                    ->description(fn (Event $record): string => 
                        $record->capacity > 0
                            ? "{$record->available_spots} spots left"
                            : "Unlimited")
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->sortable()
                    ->money('GHS')
                    ->alignEnd(),
            ])
            ->defaultSort('date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed',
                    ]),
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'physical' => 'Physical Event',
                        'webinar' => 'Online Webinar',
                    ]),
                Tables\Filters\SelectFilter::make('region')
                    ->options(function () {
                        return Event::distinct()->pluck('region', 'region')->toArray();
                    })
                    ->label('Region'),
                Tables\Filters\Filter::make('is_featured')
                    ->query(fn (Builder $query): Builder => $query->where('is_featured', true))
                    ->label('Featured Only')
                    ->toggle(),
                Tables\Filters\Filter::make('upcoming')
                    ->query(fn (Builder $query): Builder => $query->upcoming())
                    ->label('Upcoming Only')
                    ->toggle(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),                Tables\Actions\Action::make('registrations')
                    ->label('View Registrations')
                    ->url(fn (Event $record): string => EventRegistrationResource::getUrl('index', ['tableFilters' => ['event' => ['value' => $record->id]]]))
                    ->icon('heroicon-o-user-group')
                    ->color('info'),
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('publish')
                        ->action(fn (Event $record) => $record->publish())
                        ->requiresConfirmation()
                        ->color('success')
                        ->icon('heroicon-o-check')
                        ->visible(fn (Event $record): bool => $record->status === 'draft'),
                    Tables\Actions\Action::make('cancel')
                        ->action(fn (Event $record) => $record->cancel())
                        ->requiresConfirmation()
                        ->color('danger')
                        ->icon('heroicon-o-x-mark')
                        ->visible(fn (Event $record): bool => $record->status === 'published'),
                    Tables\Actions\Action::make('complete')
                        ->action(fn (Event $record) => $record->complete())
                        ->requiresConfirmation()
                        ->color('success')
                        ->icon('heroicon-o-flag')
                        ->visible(fn (Event $record): bool => 
                            $record->status === 'published' && 
                            $record->date < now()->toDateString()
                        ),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('publish')
                        ->action(function (Collection $records) {
                            $records->each->publish();
                        })
                        ->requiresConfirmation()
                        ->color('success')
                        ->icon('heroicon-o-check'),
                    Tables\Actions\BulkAction::make('cancel')
                        ->action(function (Collection $records) {
                            $records->each->cancel();
                        })
                        ->requiresConfirmation()
                        ->color('danger')
                        ->icon('heroicon-o-x-mark'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'view' => Pages\ViewEvent::route('/{record}'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
