<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\EventRegistration;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class EventRegistrationChart extends ChartWidget
{
    protected static ?string $heading = 'Event Registration Trends';
    
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        // Get data for the last 12 weeks
        $data = [];
        $labels = [];
        
        for ($i = 11; $i >= 0; $i--) {
            $startOfWeek = Carbon::now()->subWeeks($i)->startOfWeek();
            $endOfWeek = Carbon::now()->subWeeks($i)->endOfWeek();
            
            $registrations = EventRegistration::whereBetween('registered_at', [$startOfWeek, $endOfWeek])->count();
            
            $data[] = $registrations;
            $labels[] = $startOfWeek->format('M d');
        }

        return [
            'datasets' => [
                [
                    'label' => 'Weekly Registrations',
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
}
