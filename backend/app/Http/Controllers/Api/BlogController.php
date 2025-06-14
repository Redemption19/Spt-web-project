<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    /**
     * Get all published blog posts with pagination
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        $search = $request->get('search');
        
        $query = BlogPost::with(['category', 'author'])
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');
            
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }
        
        $posts = $query->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $posts->items(),
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'from' => $posts->firstItem(),
                'to' => $posts->lastItem(),
            ]
        ]);
    }
    
    /**
     * Get featured blog posts
     */
    public function featured(): JsonResponse
    {
        $posts = BlogPost::with(['category', 'author'])
            ->where('status', 'published')
            ->where('featured', true)
            ->orderBy('published_at', 'desc')
            ->limit(6)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ]);
    }
    
    /**
     * Get all blog categories
     */
    public function categories(): JsonResponse
    {
        $categories = BlogCategory::withCount(['posts' => function($query) {
            $query->where('status', 'published');
        }])->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }
    
    /**
     * Get blog posts by category
     */
    public function byCategory(Request $request, $category): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        
        $categoryModel = BlogCategory::where('slug', $category)->first();
        
        if (!$categoryModel) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }
        
        $posts = BlogPost::with(['category', 'author'])
            ->where('status', 'published')
            ->where('category_id', $categoryModel->id)
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
            
        return response()->json([
            'status' => 'success',
            'data' => $posts->items(),
            'category' => $categoryModel,
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ]
        ]);
    }
    
    /**
     * Get single blog post by slug
     */
    public function show($slug): JsonResponse
    {
        $post = BlogPost::with(['category', 'author', 'tags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->first();
            
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Blog post not found'
            ], 404);
        }
        
        // Get related posts
        $relatedPosts = BlogPost::with(['category', 'author'])
            ->where('status', 'published')
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->limit(3)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $post,
            'related_posts' => $relatedPosts
        ]);
    }
    
    /**
     * Increment view count for a blog post
     */
    public function incrementView($slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)->first();
        
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Blog post not found'
            ], 404);
        }
        
        $post->increment('views');
        
        return response()->json([
            'status' => 'success',
            'message' => 'View count updated',
            'views' => $post->views
        ]);
    }
}
