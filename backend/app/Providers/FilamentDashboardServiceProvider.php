<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Assets\Js;
use Filament\Support\Assets\Css;

class FilamentDashboardServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // Register Chart.js library for advanced charts
        FilamentAsset::register([
            Js::make('chartjs', 'https://cdn.jsdelivr.net/npm/chart.js'),
        ]);
    }
}
