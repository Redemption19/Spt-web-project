<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    /**
     * Get all gallery images with pagination and filters
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        $category = $request->get('category');
        
        $query = GalleryImage::with('category')
            ->where('active', true)
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc');
            
        if ($category) {
            $query->whereHas('category', function($q) use ($category) {
                $q->where('slug', $category);
            });
        }
        
        $images = $query->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $images->items(),
            'pagination' => [
                'current_page' => $images->currentPage(),
                'last_page' => $images->lastPage(),
                'per_page' => $images->perPage(),
                'total' => $images->total(),
            ]
        ]);
    }
    
    /**
     * Get gallery categories with image counts
     */
    public function categories(): JsonResponse
    {
        $categories = GalleryCategory::withCount(['images' => function($query) {
            $query->where('active', true);
        }])->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }
    
    /**
     * Get images by category
     */
    public function byCategory(Request $request, $category): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        
        $categoryModel = GalleryCategory::where('slug', $category)->first();
        
        if (!$categoryModel) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }
        
        $images = GalleryImage::with('category')
            ->where('active', true)
            ->where('category_id', $categoryModel->id)
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
        return response()->json([
            'status' => 'success',
            'data' => $images->items(),
            'category' => $categoryModel,
            'pagination' => [
                'current_page' => $images->currentPage(),
                'last_page' => $images->lastPage(),
                'per_page' => $images->perPage(),
                'total' => $images->total(),
            ]
        ]);
    }
}
