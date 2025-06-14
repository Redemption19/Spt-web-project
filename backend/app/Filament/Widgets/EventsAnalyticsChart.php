<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\EventRegistration;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class EventsAnalyticsChart extends ChartWidget
{
    protected static ?string $heading = 'Event Registrations Trend';
    
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        // Get last 12 months of registration data
        $data = [];
        $labels = [];
        
        for ($i = 11; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $labels[] = $month->format('M Y');
            $data[] = EventRegistration::whereYear('registered_at', $month->year)
                ->whereMonth('registered_at', $month->month)
                ->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Registrations',
                    'data' => $data,
                    'borderColor' => 'rgb(59, 130, 246)',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
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
            ],
        ];
    }
}
