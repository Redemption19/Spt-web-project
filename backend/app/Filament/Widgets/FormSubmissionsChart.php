<?php

namespace App\Filament\Widgets;

use App\Models\FormSubmission;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class FormSubmissionsChart extends ChartWidget
{
    protected static ?string $heading = 'Form Submissions by Type';
    
    protected static ?int $sort = 7;

    protected function getData(): array
    {
        // Get form submissions grouped by form type
        $submissions = FormSubmission::selectRaw('form_type, COUNT(*) as count')
            ->groupBy('form_type')
            ->get();
        
        return [
            'datasets' => [
                [
                    'label' => 'Submissions',
                    'data' => $submissions->pluck('count')->toArray(),
                    'backgroundColor' => [
                        'rgba(34, 197, 94, 0.8)',    // Emerald
                        'rgba(168, 85, 247, 0.8)',   // Violet
                        'rgba(249, 115, 22, 0.8)',   // Orange
                        'rgba(6, 182, 212, 0.8)',    // Cyan
                        'rgba(220, 38, 127, 0.8)',   // Rose
                    ],
                    'borderColor' => [
                        'rgba(34, 197, 94, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(6, 182, 212, 1)',
                        'rgba(220, 38, 127, 1)',
                    ],
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $submissions->pluck('form_type')->map(function ($type) {
                return ucfirst(str_replace('_', ' ', $type));
            })->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}
