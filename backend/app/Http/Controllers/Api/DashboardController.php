<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Event;
use App\Models\Download;
use App\Models\EventRegistration;
use App\Models\FormSubmission;
use App\Models\NewsletterSubscription;
use App\Models\SurveyResponse;
use App\Models\Testimonial;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get comprehensive dashboard statistics
     */
    public function stats(): JsonResponse
    {
        $stats = [
            // Content Stats
            'content' => [
                'total_blog_posts' => BlogPost::where('status', 'published')->count(),
                'draft_posts' => BlogPost::where('status', 'draft')->count(),
                'total_events' => Event::count(),
                'upcoming_events' => Event::where('event_date', '>', now())->count(),
                'total_downloads' => Download::where('active', true)->count(),
                'total_gallery_images' => GalleryImage::where('active', true)->count(),
                'total_testimonials' => Testimonial::where('active', true)->count(),
            ],
            
            // Engagement Stats
            'engagement' => [
                'total_blog_views' => BlogPost::sum('views') ?? 0,
                'total_downloads_count' => Download::sum('download_count') ?? 0,
                'total_event_registrations' => EventRegistration::count(),
                'total_newsletter_subscribers' => NewsletterSubscription::where('status', 'active')->count(),
                'total_form_submissions' => FormSubmission::count(),
                'total_survey_responses' => SurveyResponse::count(),
            ],
            
            // Recent Activity (Last 30 days)
            'recent_activity' => [
                'new_blog_posts' => BlogPost::where('created_at', '>=', now()->subDays(30))->count(),
                'new_event_registrations' => EventRegistration::where('registered_at', '>=', now()->subDays(30))->count(),
                'new_newsletter_subscribers' => NewsletterSubscription::where('subscribed_at', '>=', now()->subDays(30))->count(),
                'new_form_submissions' => FormSubmission::where('created_at', '>=', now()->subDays(30))->count(),
                'new_downloads' => Download::where('last_downloaded_at', '>=', now()->subDays(30))->sum('download_count') ?? 0,
            ],
            
            // Popular Content
            'popular' => [
                'most_viewed_posts' => BlogPost::where('status', 'published')
                    ->orderBy('views', 'desc')
                    ->limit(5)
                    ->select('id', 'title', 'slug', 'views')
                    ->get(),
                'most_downloaded_files' => Download::where('active', true)
                    ->orderBy('download_count', 'desc')
                    ->limit(5)
                    ->select('id', 'title', 'download_count', 'category')
                    ->get(),
                'upcoming_events' => Event::where('event_date', '>', now())
                    ->orderBy('event_date', 'asc')
                    ->limit(3)
                    ->select('id', 'title', 'slug', 'event_date', 'capacity')
                    ->get(),
            ]
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }
    
    /**
     * Get analytics data for charts
     */
    public function analytics(Request $request): JsonResponse
    {
        $period = $request->get('period', '30'); // days
        $startDate = now()->subDays($period);
        
        $analytics = [
            'blog_views_trend' => $this->getBlogViewsTrend($startDate),
            'event_registrations_trend' => $this->getEventRegistrationsTrend($startDate),
            'newsletter_growth' => $this->getNewsletterGrowth($startDate),
            'download_trends' => $this->getDownloadTrends($startDate),
            'form_submissions_by_type' => $this->getFormSubmissionsByType($startDate),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $analytics
        ]);
    }
    
    private function getBlogViewsTrend($startDate)
    {
        return BlogPost::selectRaw('DATE(created_at) as date, SUM(views) as total_views')
            ->where('created_at', '>=', $startDate)
            ->where('status', 'published')
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }
    
    private function getEventRegistrationsTrend($startDate)
    {
        return EventRegistration::selectRaw('DATE(registered_at) as date, COUNT(*) as registrations')
            ->where('registered_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }
    
    private function getNewsletterGrowth($startDate)
    {
        return NewsletterSubscription::selectRaw('DATE(subscribed_at) as date, COUNT(*) as subscribers')
            ->where('subscribed_at', '>=', $startDate)
            ->where('status', 'active')
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }
    
    private function getDownloadTrends($startDate)
    {
        return Download::selectRaw('category, SUM(download_count) as total_downloads')
            ->where('last_downloaded_at', '>=', $startDate)
            ->where('active', true)
            ->groupBy('category')
            ->orderBy('total_downloads', 'desc')
            ->get();
    }
    
    private function getFormSubmissionsByType($startDate)
    {
        return FormSubmission::selectRaw('form_type, COUNT(*) as submissions')
            ->where('created_at', '>=', $startDate)
            ->groupBy('form_type')
            ->orderBy('submissions', 'desc')
            ->get();
    }
    
    /**
     * Get system health status
     */
    public function health(): JsonResponse
    {
        $health = [
            'database' => $this->checkDatabaseHealth(),
            'storage' => $this->checkStorageHealth(),
            'cache' => $this->checkCacheHealth(),
            'queue' => $this->checkQueueHealth(),
        ];
        
        $overallStatus = collect($health)->every(fn($status) => $status === 'healthy') ? 'healthy' : 'warning';
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'overall_status' => $overallStatus,
                'components' => $health,
                'timestamp' => now()->toISOString()
            ]
        ]);
    }
    
    private function checkDatabaseHealth()
    {
        try {
            \DB::connection()->getPdo();
            return 'healthy';
        } catch (\Exception $e) {
            return 'unhealthy';
        }
    }
    
    private function checkStorageHealth()
    {
        try {
            \Storage::disk('local')->exists('test.txt') || \Storage::disk('local')->put('test.txt', 'test');
            return 'healthy';
        } catch (\Exception $e) {
            return 'unhealthy';
        }
    }
    
    private function checkCacheHealth()
    {
        try {
            \Cache::put('health_check', true, 60);
            return \Cache::get('health_check') ? 'healthy' : 'unhealthy';
        } catch (\Exception $e) {
            return 'unhealthy';
        }
    }
    
    private function checkQueueHealth()
    {
        // Basic queue health check
        try {
            $queueSize = \DB::table('jobs')->count();
            return $queueSize < 1000 ? 'healthy' : 'warning'; // Arbitrary threshold
        } catch (\Exception $e) {
            return 'unhealthy';
        }
    }
}
