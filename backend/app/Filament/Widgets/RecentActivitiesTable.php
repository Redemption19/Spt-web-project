<?php

namespace App\Filament\Widgets;

use App\Models\EventRegistration;
use App\Models\FormSubmission;
use App\Models\NewsletterSubscription;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentActivitiesTable extends BaseWidget
{
    protected static ?string $heading = 'Recent Activities';
    
    protected static ?int $sort = 8;
    
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query($this->getTableQuery())
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->label('Activity Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Event Registration' => 'success',
                        'Form Submission' => 'info',
                        'Newsletter Signup' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('user_name')
                    ->label('User')
                    ->searchable(),
                Tables\Columns\TextColumn::make('details')
                    ->label('Details')
                    ->limit(50),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated([10, 25, 50]);
    }    protected function getTableQuery(): Builder
    {
        // For simplicity, let's just show event registrations 
        // to avoid union query complications
        return EventRegistration::with('event')
            ->select([
                'id',
                'name as user_name',
                'registered_at as created_at',
                'event_id'
            ])
            ->selectRaw("'Event Registration' as type")
            ->selectRaw("CONCAT('Registered for: ', COALESCE((SELECT title FROM events WHERE events.id = event_registrations.event_id), 'Unknown Event')) as details")            ->latest('registered_at');
    }

    public function getTableRecordKey(mixed $record): string
    {
        return (string) $record->id;
    }
}
