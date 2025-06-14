<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HeroSectionController extends Controller
{
    /**
     * Get all hero sections
     */
    public function index(Request $request): JsonResponse
    {
        $heroSections = HeroSection::where('active', true)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $heroSections
        ]);
    }
    
    /**
     * Get active hero sections for display
     */
    public function active(): JsonResponse
    {
        $heroSections = HeroSection::where('active', true)
            ->orderBy('order', 'asc')
            ->limit(5) // Limit to avoid too many slides
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $heroSections
        ]);
    }
}
