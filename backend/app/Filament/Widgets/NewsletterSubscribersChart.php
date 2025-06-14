<?php

namespace App\Filament\Widgets;

use App\Models\NewsletterSubscription;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class NewsletterSubscribersChart extends ChartWidget
{
    protected static ?string $heading = 'Newsletter Subscriber Growth';
    
    protected static ?int $sort = 5;

    protected function getData(): array
    {
        // Get cumulative subscriber growth over the last 12 months
        $data = [];
        $labels = [];
        $cumulativeCount = 0;
        
        for ($i = 11; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthlySubscribers = NewsletterSubscription::whereMonth('subscribed_at', $month->month)
                ->whereYear('subscribed_at', $month->year)
                ->count();
            
            $cumulativeCount += $monthlySubscribers;
            $data[] = $cumulativeCount;
            $labels[] = $month->format('M Y');
        }

        return [
            'datasets' => [
                [
                    'label' => 'Total Subscribers',
                    'data' => $data,
                    'borderColor' => 'rgb(16, 185, 129)',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
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
