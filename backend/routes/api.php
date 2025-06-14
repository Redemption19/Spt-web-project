<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\DownloadController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\HeroSectionController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\BlogExtensionController;
use App\Http\Controllers\Api\EventExtensionController;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FormSubmissionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API Routes (no authentication required)
Route::prefix('v1')->group(function () {
    
    // Blog Routes
    Route::prefix('blog')->group(function () {
        Route::get('/', [BlogController::class, 'index']);
        Route::get('/featured', [BlogController::class, 'featured']);
        Route::get('/categories', [BlogController::class, 'categories']);
        Route::get('/categories/{category}', [BlogController::class, 'byCategory']);
        Route::get('/{slug}', [BlogController::class, 'show']);
        Route::post('/{slug}/view', [BlogController::class, 'incrementView']);
    });
    
    // Events Routes
    Route::prefix('events')->group(function () {
        Route::get('/', [EventController::class, 'index']);
        Route::get('/upcoming', [EventController::class, 'upcoming']);
        Route::get('/featured', [EventController::class, 'featured']);
        Route::get('/{slug}', [EventController::class, 'show']);
        Route::post('/{slug}/register', [EventController::class, 'register']);
    });
    
    // Downloads Routes
    Route::prefix('downloads')->group(function () {
        Route::get('/', [DownloadController::class, 'index']);
        Route::get('/categories', [DownloadController::class, 'categories']);
        Route::get('/category/{category}', [DownloadController::class, 'byCategory']);
        Route::get('/featured', [DownloadController::class, 'featured']);
        Route::get('/{id}/download', [DownloadController::class, 'download']);
    });
    
    // Gallery Routes
    Route::prefix('gallery')->group(function () {
        Route::get('/', [GalleryController::class, 'index']);
        Route::get('/categories', [GalleryController::class, 'categories']);
        Route::get('/category/{category}', [GalleryController::class, 'byCategory']);
    });
    
    // Testimonials Routes
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/testimonials/featured', [TestimonialController::class, 'featured']);
    
    // Hero Section Routes
    Route::get('/hero-sections', [HeroSectionController::class, 'index']);
    Route::get('/hero-sections/active', [HeroSectionController::class, 'active']);
    
    // Contact Routes
    Route::post('/contact', [ContactController::class, 'submit']);
    Route::post('/contact/callback', [ContactController::class, 'requestCallback']);
    
    // Newsletter Routes
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
    Route::get('/newsletter/verify/{token}', [NewsletterController::class, 'verify']);
    Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);
      // General Stats (for frontend widgets)
    Route::get('/stats', function () {
        return response()->json([
            'total_events' => \App\Models\Event::count(),
            'total_blog_posts' => \App\Models\BlogPost::where('status', 'published')->count(),
            'total_downloads' => \App\Models\Download::where('active', true)->count(),
            'total_subscribers' => \App\Models\NewsletterSubscription::where('status', 'active')->count(),
        ]);
    });
    
    // Blog Extensions (Authors, Tags)
    Route::prefix('blog')->group(function () {
        Route::get('/authors', [BlogExtensionController::class, 'authors']);
        Route::get('/authors/{id}', [BlogExtensionController::class, 'author']);
        Route::get('/tags', [BlogExtensionController::class, 'tags']);
        Route::get('/tags/{id}', [BlogExtensionController::class, 'tag']);
    });
    
    // Event Extensions (Speakers, Agenda)
    Route::prefix('events')->group(function () {
        Route::get('/{id}/speakers', [EventExtensionController::class, 'speakers']);
        Route::get('/{id}/agenda', [EventExtensionController::class, 'agenda']);
        Route::get('/{id}/analytics', [EventExtensionController::class, 'analytics']);
    });
    
    // Survey Routes
    Route::prefix('surveys')->group(function () {
        Route::get('/', [SurveyController::class, 'index']);
        Route::get('/{id}', [SurveyController::class, 'show']);
        Route::post('/{id}/responses', [SurveyController::class, 'submitResponse']);
        Route::get('/{id}/results', [SurveyController::class, 'results']);
    });
      // Dashboard Analytics (Public stats)
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', [DashboardController::class, 'stats']);
        Route::get('/analytics', [DashboardController::class, 'analytics']);
        Route::get('/health', [DashboardController::class, 'health']);
    });
    
    // Form Submissions (Public stats only)
    Route::prefix('forms')->group(function () {
        Route::get('/stats', [FormSubmissionController::class, 'stats']);
        Route::get('/contact/stats', [FormSubmissionController::class, 'contactStats']);
    });
});

// Protected API Routes (require authentication)
Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
      // User specific routes
    Route::prefix('user')->group(function () {
        Route::get('/profile', function (Request $request) {
            return $request->user();
        });
        Route::get('/event-registrations', [EventController::class, 'userRegistrations']);
        Route::get('/downloads', [DownloadController::class, 'userDownloads']);
    });
    
    // Admin Dashboard Analytics (Protected)
    Route::prefix('admin/dashboard')->group(function () {
        Route::get('/widgets', [DashboardController::class, 'widgets']);
        Route::get('/metrics', [DashboardController::class, 'metrics']);
        Route::get('/reports', [DashboardController::class, 'reports']);
    });
      // Admin Survey Management
    Route::prefix('admin/surveys')->group(function () {
        Route::get('/{id}/responses', [SurveyController::class, 'adminResponses']);
        Route::get('/{id}/analytics', [SurveyController::class, 'analytics']);
        Route::delete('/responses/{id}', [SurveyController::class, 'deleteResponse']);
    });
    
    // Admin Form Management
    Route::prefix('admin/forms')->group(function () {
        // Form Submissions
        Route::get('/submissions', [FormSubmissionController::class, 'index']);
        Route::get('/submissions/{id}', [FormSubmissionController::class, 'show']);
        Route::patch('/submissions/{id}/status', [FormSubmissionController::class, 'updateStatus']);
        
        // Contact Forms
        Route::get('/contacts', [FormSubmissionController::class, 'contactForms']);
        Route::get('/contacts/{id}', [FormSubmissionController::class, 'contactForm']);
        Route::patch('/contacts/{id}/status', [FormSubmissionController::class, 'updateContactStatus']);
    });
    
});
