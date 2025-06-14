<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventSpeaker;
use App\Models\EventAgenda;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EventExtensionController extends Controller
{
    /**
     * Get speakers for a specific event
     */
    public function speakers($eventId): JsonResponse
    {
        $speakers = EventSpeaker::where('event_id', $eventId)
            ->orderBy('is_keynote', 'desc')
            ->orderBy('order', 'asc')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $speakers
        ]);
    }
    
    /**
     * Get agenda for a specific event
     */
    public function agenda($eventId): JsonResponse
    {
        $agenda = EventAgenda::where('event_id', $eventId)
            ->orderBy('time', 'asc')
            ->orderBy('order', 'asc')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $agenda
        ]);
    }
    
    /**
     * Get analytics for a specific event
     */
    public function analytics($eventId): JsonResponse
    {
        $event = \App\Models\Event::find($eventId);
        
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }
        
        $analytics = [
            'event_id' => $eventId,
            'title' => $event->title,
            'total_registrations' => $event->registrations()->count(),
            'confirmed_registrations' => $event->registrations()->where('status', 'confirmed')->count(),
            'cancelled_registrations' => $event->registrations()->where('status', 'cancelled')->count(),
            'checked_in_attendees' => $event->registrations()->whereNotNull('checked_in_at')->count(),
            'capacity_utilization' => $event->capacity > 0 ? ($event->current_attendees / $event->capacity) * 100 : 0,
            'registration_trend' => $event->registrations()
                ->selectRaw('DATE(registered_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
            'speakers_count' => $event->speakers()->count(),
            'keynote_speakers_count' => $event->speakers()->where('is_keynote', true)->count(),
            'agenda_items_count' => $event->agenda()->count(),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $analytics
        ]);
    }
}
