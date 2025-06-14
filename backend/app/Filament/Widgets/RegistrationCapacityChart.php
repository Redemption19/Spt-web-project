<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Widgets\ChartWidget;

class RegistrationCapacityChart extends ChartWidget
{
    protected static ?string $heading = 'Event Capacity Utilization';
    
    protected static ?int $sort = 7;

    protected function getData(): array
    {
        $events = Event::where('status', 'published')
            ->where('capacity', '>', 0)
            ->orderBy('date', 'asc')
            ->limit(8)
            ->get();

        $labels = [];
        $capacityData = [];
        $registrationsData = [];

        foreach ($events as $event) {
            $labels[] = substr($event->title, 0, 20) . '...';
            $capacityData[] = $event->capacity;
            $registrationsData[] = $event->current_attendees;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Capacity',
                    'data' => $capacityData,
                    'backgroundColor' => 'rgba(156, 163, 175, 0.6)',
                    'borderColor' => 'rgb(156, 163, 175)',
                    'borderWidth' => 1,
                ],
                [
                    'label' => 'Current Registrations',
                    'data' => $registrationsData,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.8)',
                    'borderColor' => 'rgb(59, 130, 246)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                ],
                'x' => [
                    'ticks' => [
                        'maxRotation' => 45,
                        'minRotation' => 45,
                    ],
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
        ];
    }
}
