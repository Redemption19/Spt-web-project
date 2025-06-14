<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Filament\Resources\EventResource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class UpcomingEventsWidget extends BaseWidget
{
    protected static ?string $heading = 'Upcoming Events';
    
    protected static ?int $sort = 6;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Event::upcoming()
                    ->with(['registrations'])
                    ->limit(5)
            )
            ->columns([
                Tables\Columns\ImageColumn::make('banner')
                    ->circular()
                    ->size(40),
                    
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->limit(40)
                    ->tooltip(function (Event $record): string {
                        return $record->title;
                    }),
                    
                Tables\Columns\TextColumn::make('date')
                    ->date('M j, Y')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('time')
                    ->time('g:i A'),
                    
                Tables\Columns\BadgeColumn::make('type')
                    ->colors([
                        'info' => 'webinar',
                        'success' => 'physical',
                    ]),
                    
                Tables\Columns\TextColumn::make('capacity_info')
                    ->label('Capacity')
                    ->formatStateUsing(function (Event $record): string {
                        $percentage = $record->capacity > 0 ? 
                            round(($record->current_attendees / $record->capacity) * 100) : 0;
                        return "{$record->current_attendees}/{$record->capacity} ({$percentage}%)";
                    })
                    ->color(function (Event $record): string {
                        $percentage = $record->capacity > 0 ? 
                            ($record->current_attendees / $record->capacity) * 100 : 0;
                        return $percentage >= 90 ? 'danger' : ($percentage >= 70 ? 'warning' : 'success');
                    }),
                    
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('')
                    ->trueColor('warning'),
            ])            ->actions([
                Tables\Actions\Action::make('view')
                    ->icon('heroicon-o-eye')
                    ->url(fn (Event $record): string => 
                        EventResource::getUrl('view', ['record' => $record])
                    ),
                Tables\Actions\Action::make('edit')
                    ->icon('heroicon-o-pencil')
                    ->url(fn (Event $record): string => 
                        EventResource::getUrl('edit', ['record' => $record])
                    ),
            ])
            ->emptyStateHeading('No upcoming events')
            ->emptyStateDescription('Create your first event to see it here.')
            ->emptyStateIcon('heroicon-o-calendar-days');
    }
}
