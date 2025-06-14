<?php

namespace App\Filament\Widgets;

use App\Models\Download;
use Filament\Widgets\ChartWidget;

class FileDownloadsChart extends ChartWidget
{
    protected static ?string $heading = 'Popular File Downloads';
    
    protected static ?int $sort = 6;

    protected function getData(): array
    {
        $downloads = Download::orderBy('download_count', 'desc')->limit(6)->get();
        
        return [
            'datasets' => [
                [
                    'label' => 'Downloads',
                    'data' => $downloads->pluck('download_count')->toArray(),
                    'backgroundColor' => [
                        'rgba(251, 191, 36, 0.8)',   // Amber
                        'rgba(139, 92, 246, 0.8)',   // Purple
                        'rgba(236, 72, 153, 0.8)',   // Pink
                        'rgba(59, 130, 246, 0.8)',   // Blue
                        'rgba(16, 185, 129, 0.8)',   // Green
                        'rgba(239, 68, 68, 0.8)',    // Red
                    ],
                    'borderWidth' => 2,
                    'borderColor' => [
                        'rgba(251, 191, 36, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(239, 68, 68, 1)',
                    ],
                ],
            ],
            'labels' => $downloads->pluck('title')->map(function ($title) {
                return strlen($title) > 20 ? substr($title, 0, 20) . '...' : $title;
            })->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
