<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\BlogPost;
use App\Filament\Resources\EventResource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Model;

class RecentActivitiesWidget extends BaseWidget
{
    protected static ?string $heading = 'Recent Activities';
    
    protected static ?int $sort = 5;
    
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                // Combine recent events, registrations, and blog posts
                EventRegistration::query()
                    ->with(['event'])
                    ->latest('registered_at')
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('activity')
                    ->label('Activity')
                    ->formatStateUsing(function (EventRegistration $record): string {
                        return "New registration for: {$record->event->title}";
                    })
                    ->icon('heroicon-o-user-plus')
                    ->color('success'),
                    
                Tables\Columns\TextColumn::make('name')
                    ->label('User/Details')
                    ->searchable(),
                    
                Tables\Columns\TextColumn::make('event.type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'webinar' => 'info',
                        'physical' => 'success',
                        default => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('registered_at')
                    ->label('Date')
                    ->dateTime('M j, Y g:i A')
                    ->sortable(),
                    
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => 'confirmed',
                        'warning' => 'pending',
                        'danger' => 'cancelled',
                        'info' => 'attended',
                    ]),
            ])
            ->actions([                Tables\Actions\Action::make('view_event')
                    ->label('View Event')
                    ->icon('heroicon-o-eye')
                    ->url(fn (EventRegistration $record): string => 
                        EventResource::getUrl('view', ['record' => $record->event])
                    )
                    ->openUrlInNewTab(),
            ])
            ->emptyStateHeading('No recent activities')
            ->emptyStateDescription('Recent registrations and activities will appear here.')
            ->emptyStateIcon('heroicon-o-clock');
    }
}
