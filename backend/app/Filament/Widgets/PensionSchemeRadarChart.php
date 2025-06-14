<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class PensionSchemeRadarChart extends ChartWidget
{
    protected static ?string $heading = 'Pension Scheme Comparison';
    
    protected static ?int $sort = 12;
    
    protected function getData(): array
    {
        // In a real-world scenario, these would be pulled from actual scheme metrics
        return [
            'datasets' => [
                [
                    'label' => 'Tier 1 Scheme',
                    'data' => [90, 75, 80, 85, 95, 70],
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'borderColor' => 'rgba(59, 130, 246, 1)',
                    'pointBackgroundColor' => 'rgba(59, 130, 246, 1)',
                    'pointBorderColor' => '#fff',
                    'pointHoverBackgroundColor' => '#fff',
                    'pointHoverBorderColor' => 'rgba(59, 130, 246, 1)',
                ],
                [
                    'label' => 'Tier 2 Scheme',
                    'data' => [80, 90, 75, 95, 85, 80],
                    'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
                    'borderColor' => 'rgba(16, 185, 129, 1)',
                    'pointBackgroundColor' => 'rgba(16, 185, 129, 1)',
                    'pointBorderColor' => '#fff',
                    'pointHoverBackgroundColor' => '#fff',
                    'pointHoverBorderColor' => 'rgba(16, 185, 129, 1)',
                ],
                [
                    'label' => 'Voluntary Scheme',
                    'data' => [70, 85, 95, 80, 75, 90],
                    'backgroundColor' => 'rgba(245, 158, 11, 0.2)',
                    'borderColor' => 'rgba(245, 158, 11, 1)',
                    'pointBackgroundColor' => 'rgba(245, 158, 11, 1)',
                    'pointBorderColor' => '#fff',
                    'pointHoverBackgroundColor' => '#fff',
                    'pointHoverBorderColor' => 'rgba(245, 158, 11, 1)',
                ],
            ],
            'labels' => [
                'Returns', 
                'Risk Rating', 
                'Flexibility', 
                'Management Fee', 
                'Accessibility', 
                'Long-term Growth'
            ],
        ];
    }

    protected function getType(): string
    {
        return 'radar';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'r' => [
                    'beginAtZero' => true,
                    'min' => 0,
                    'max' => 100,
                    'ticks' => [
                        'stepSize' => 20,
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'position' => 'top',
                ],
                'tooltip' => [
                    'callbacks' => [
                        'label' => "
                            function(context) {
                                return context.dataset.label + ': ' + context.parsed.r + '%';
                            }
                        ",
                    ],
                ],
            ],
            'responsive' => true,
            'maintainAspectRatio' => false,
        ];
    }
}
