<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestimonialController extends Controller
{
    /**
     * Get all active testimonials with pagination
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 10);
        
        $testimonials = Testimonial::where('active', true)
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
        return response()->json([
            'status' => 'success',
            'data' => $testimonials->items(),
            'pagination' => [
                'current_page' => $testimonials->currentPage(),
                'last_page' => $testimonials->lastPage(),
                'per_page' => $testimonials->perPage(),
                'total' => $testimonials->total(),
            ]
        ]);
    }
    
    /**
     * Get featured testimonials
     */
    public function featured(): JsonResponse
    {
        $testimonials = Testimonial::where('active', true)
            ->where('featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $testimonials
        ]);
    }
}
