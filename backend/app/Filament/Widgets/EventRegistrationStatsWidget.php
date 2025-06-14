<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use App\Models\EventRegistration;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class EventRegistrationStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        // Registration statistics
        $totalRegistrations = EventRegistration::count();
        $confirmedRegistrations = EventRegistration::where('status', 'confirmed')->count();
        $pendingRegistrations = EventRegistration::where('status', 'pending')->count();
        $attendedRegistrations = EventRegistration::where('status', 'attended')->count();
        
        // Recent registrations
        $thisWeekRegistrations = EventRegistration::where('registered_at', '>=', now()->startOfWeek())->count();
        $todayRegistrations = EventRegistration::whereDate('registered_at', today())->count();
        
        // Event capacity metrics
        $totalCapacity = Event::where('status', 'published')->sum('capacity');
        $availableCapacity = $totalCapacity - $confirmedRegistrations;
        $capacityUtilization = $totalCapacity > 0 ? round(($confirmedRegistrations / $totalCapacity) * 100, 1) : 0;
        
        // Calculate conversion rate (confirmed from total)
        $conversionRate = $totalRegistrations > 0 
            ? round(($confirmedRegistrations / $totalRegistrations) * 100, 1)
            : 0;
            
        // Attendance rate
        $attendanceRate = $confirmedRegistrations > 0 
            ? round(($attendedRegistrations / $confirmedRegistrations) * 100, 1)
            : 0;

        return [
            Stat::make('Total Registrations', number_format($totalRegistrations))
                ->description("{$confirmedRegistrations} confirmed, {$pendingRegistrations} pending")
                ->descriptionIcon('heroicon-m-user-group')
                ->chart($this->getRegistrationChart())
                ->color('success'),
                
            Stat::make('Weekly Registrations', $thisWeekRegistrations)
                ->description("{$todayRegistrations} today")
                ->descriptionIcon('heroicon-m-calendar-days')
                ->chart($this->getWeeklyChart())
                ->color('info'),
                
            Stat::make('Capacity Utilization', "{$capacityUtilization}%")
                ->description("{$availableCapacity} spots remaining")
                ->descriptionIcon('heroicon-m-chart-pie')
                ->chart($this->getCapacityChart())
                ->color($capacityUtilization >= 80 ? 'success' : ($capacityUtilization >= 60 ? 'warning' : 'danger')),
                
            Stat::make('Attendance Rate', "{$attendanceRate}%")
                ->description("Showed up from confirmed")
                ->descriptionIcon('heroicon-m-check-circle')
                ->chart($this->getAttendanceChart())
                ->color($attendanceRate >= 80 ? 'success' : ($attendanceRate >= 60 ? 'warning' : 'danger')),
        ];
    }

    private function getRegistrationChart(): array
    {
        // Last 7 days registration data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = EventRegistration::whereDate('registered_at', $date)->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getWeeklyChart(): array
    {
        // Last 7 weeks registration data
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $weekStart = now()->subWeeks($i)->startOfWeek();
            $weekEnd = now()->subWeeks($i)->endOfWeek();
            $count = EventRegistration::whereBetween('registered_at', [$weekStart, $weekEnd])->count();
            $data[] = $count;
        }
        return $data;
    }

    private function getCapacityChart(): array
    {
        // Capacity utilization over last 7 days
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $totalCapacity = Event::where('date', '>=', $date)->sum('capacity');
            $registrations = EventRegistration::where('registered_at', '<=', $date)
                ->where('status', 'confirmed')->count();
            
            $utilization = $totalCapacity > 0 ? round(($registrations / $totalCapacity) * 100) : 0;
            $data[] = $utilization;
        }
        return $data;
    }

    private function getAttendanceChart(): array
    {
        // Attendance rate over last 7 events
        $recentEvents = Event::where('date', '<', now())
            ->orderBy('date', 'desc')
            ->take(7)
            ->get();
            
        $data = [];
        foreach ($recentEvents as $event) {
            $confirmed = $event->registrations()->where('status', 'confirmed')->count();
            $attended = $event->registrations()->where('status', 'attended')->count();
            $rate = $confirmed > 0 ? round(($attended / $confirmed) * 100) : 0;
            $data[] = $rate;
        }
        
        // Fill with default values if not enough events
        while (count($data) < 7) {
            array_unshift($data, 0);
        }
        
        return array_slice($data, 0, 7);
    }
}
