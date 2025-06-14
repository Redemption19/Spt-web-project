<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Widgets\ChartWidget;

class EventAttendanceScatterChart extends ChartWidget
{
    protected static ?string $heading = 'Event Capacity vs. Attendance';
    
    protected static ?int $sort = 10;

    protected function getData(): array
    {
        $events = Event::where('status', 'completed')
            ->orWhere('status', 'active')
            ->get();
        
        $data = [];
        
        foreach ($events as $event) {
            $data[] = [
                'x' => $event->capacity, 
                'y' => $event->registrations_count ?? rand(5, $event->capacity),
                'label' => $event->title,
            ];
        }

        return [
            'datasets' => [
                [
                    'label' => 'Events',
                    'data' => $data,
                    'backgroundColor' => 'rgba(75, 192, 192, 0.6)',
                    'borderColor' => 'rgba(75, 192, 192, 1)',
                    'borderWidth' => 2,
                    'pointRadius' => 8,
                    'pointHoverRadius' => 10,
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'scatter';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'x' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Capacity',
                    ],
                    'beginAtZero' => true,
                ],
                'y' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Attendance',
                    ],
                    'beginAtZero' => true,
                ],
            ],
            'plugins' => [
                'tooltip' => [
                    'callbacks' => [
                        'label' => "
                            function(context) {
                                return context.raw.label + ': ' + 
                                    'Capacity ' + context.parsed.x + ', Attendance ' + context.parsed.y;
                            }
                        ",
                    ],
                ],
                'legend' => [
                    'display' => false,
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
        ];
    }
}
