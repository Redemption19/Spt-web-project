<?php

namespace App\Filament\Resources\EventResource\Pages;

use App\Filament\Resources\EventResource;
use App\Filament\Resources\EventRegistrationResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components;

class ViewEvent extends ViewRecord
{
    protected static string $resource = EventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('view_registrations')
                ->label('View Registrations')
                ->icon('heroicon-o-user-group')
                ->color('info')
                ->url(fn (): string => EventRegistrationResource::getUrl('index', [
                    'tableFilters' => [
                        'event' => ['value' => $this->record->id]
                    ]
                ])),
            Actions\EditAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make('Event Information')
                    ->schema([
                        Components\Grid::make(2)
                            ->schema([
                                Components\TextEntry::make('title')
                                    ->size('lg')
                                    ->weight('bold'),
                                Components\TextEntry::make('status')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        'published' => 'success',
                                        'draft' => 'gray',
                                        'cancelled' => 'danger',
                                        'completed' => 'info',
                                    }),
                                Components\TextEntry::make('description')
                                    ->html()
                                    ->columnSpanFull(),
                                Components\ImageEntry::make('banner')
                                    ->columnSpanFull()
                                    ->height(200),
                            ]),
                    ]),

                Components\Section::make('Event Details')
                    ->schema([
                        Components\Grid::make(3)
                            ->schema([
                                Components\TextEntry::make('date')
                                    ->date('F j, Y'),
                                Components\TextEntry::make('time')
                                    ->time('g:i A'),
                                Components\TextEntry::make('type')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        'webinar' => 'info',
                                        'physical' => 'success',
                                    }),
                                Components\TextEntry::make('venue'),
                                Components\TextEntry::make('region'),
                                Components\TextEntry::make('capacity')
                                    ->suffix(' people'),
                                Components\TextEntry::make('current_attendees')
                                    ->label('Current Registrations'),
                                Components\TextEntry::make('price')
                                    ->money('GHS'),
                                Components\IconEntry::make('is_featured')
                                    ->label('Featured Event')
                                    ->boolean(),
                            ]),
                    ])->columns(3),

                Components\Section::make('Registration & Links')
                    ->schema([
                        Components\Grid::make(2)
                            ->schema([
                                Components\TextEntry::make('registration_link')
                                    ->url(fn (?string $state): ?string => $state)
                                    ->openUrlInNewTab(),
                                Components\TextEntry::make('map_link')
                                    ->url(fn (?string $state): ?string => $state)
                                    ->openUrlInNewTab(),
                                Components\TextEntry::make('registration_deadline')
                                    ->dateTime('F j, Y g:i A'),
                                Components\TextEntry::make('requirements')
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Components\Section::make('Contact Information')
                    ->schema([
                        Components\KeyValueEntry::make('contact_info')
                            ->columnSpanFull(),
                    ])
                    ->visible(fn ($record): bool => !empty($record->contact_info)),
            ]);
    }
}
