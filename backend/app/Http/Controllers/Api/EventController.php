<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class EventController extends Controller
{
    /**
     * Get all events with pagination and filters
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        $type = $request->get('type');
        $region = $request->get('region');
        $status = $request->get('status', 'active');
        
        $query = Event::with(['speakers', 'agenda'])
            ->where('status', $status)
            ->orderBy('event_date', 'asc');
            
        if ($type) {
            $query->where('type', $type);
        }
        
        if ($region) {
            $query->where('region', $region);
        }
        
        $events = $query->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $events->items(),
            'pagination' => [
                'current_page' => $events->currentPage(),
                'last_page' => $events->lastPage(),
                'per_page' => $events->perPage(),
                'total' => $events->total(),
            ]
        ]);
    }
    
    /**
     * Get upcoming events
     */
    public function upcoming(Request $request): JsonResponse
    {
        $limit = $request->get('limit', 6);
        
        $events = Event::with(['speakers'])
            ->where('status', 'active')
            ->where('event_date', '>', Carbon::now())
            ->orderBy('event_date', 'asc')
            ->limit($limit)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $events
        ]);
    }
    
    /**
     * Get featured events
     */
    public function featured(): JsonResponse
    {
        $events = Event::with(['speakers'])
            ->where('status', 'active')
            ->where('is_featured', true)
            ->orderBy('event_date', 'asc')
            ->limit(3)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $events
        ]);
    }
    
    /**
     * Get single event by slug
     */
    public function show($slug): JsonResponse
    {
        $event = Event::with(['speakers', 'agenda', 'registrations'])
            ->where('slug', $slug)
            ->first();
            
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        // Add registration count and availability
        $registrationCount = $event->registrations->count();
        $availableSpots = $event->capacity - $registrationCount;
        
        $eventData = $event->toArray();
        $eventData['registration_count'] = $registrationCount;
        $eventData['available_spots'] = $availableSpots;
        $eventData['is_full'] = $availableSpots <= 0;
        $eventData['registration_deadline_passed'] = $event->registration_deadline && Carbon::now()->gt($event->registration_deadline);
        
        return response()->json([
            'status' => 'success',
            'data' => $eventData
        ]);
    }
    
    /**
     * Register for an event
     */
    public function register(Request $request, $slug): JsonResponse
    {
        $event = Event::where('slug', $slug)->first();
        
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        // Check if event is still accepting registrations
        if ($event->status !== 'active') {
            return response()->json([
                'status' => 'error',
                'message' => 'Event is not accepting registrations'
            ], 400);
        }
        
        // Check registration deadline
        if ($event->registration_deadline && Carbon::now()->gt($event->registration_deadline)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration deadline has passed'
            ], 400);
        }
        
        // Check capacity
        $currentRegistrations = EventRegistration::where('event_id', $event->id)->count();
        if ($currentRegistrations >= $event->capacity) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event is at full capacity'
            ], 400);
        }
        
        // Validate registration data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'organization' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'special_requirements' => 'nullable|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Check if email is already registered for this event
        $existingRegistration = EventRegistration::where('event_id', $event->id)
            ->where('email', $request->email)
            ->first();
            
        if ($existingRegistration) {
            return response()->json([
                'status' => 'error',
                'message' => 'This email is already registered for this event'
            ], 400);
        }
        
        // Create registration
        $registration = EventRegistration::create([
            'event_id' => $event->id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'organization' => $request->organization,
            'position' => $request->position,
            'special_requirements' => $request->special_requirements,
            'status' => 'confirmed',
            'registered_at' => Carbon::now(),
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Registration successful',
            'data' => $registration
        ], 201);
    }
    
    /**
     * Get user's event registrations (requires authentication)
     */
    public function userRegistrations(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $registrations = EventRegistration::with('event')
            ->where('email', $user->email)
            ->orderBy('registered_at', 'desc')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $registrations
        ]);
    }
}
