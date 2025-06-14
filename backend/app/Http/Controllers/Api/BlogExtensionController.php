<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogAuthor;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BlogExtensionController extends Controller
{
    /**
     * Get all blog authors
     */
    public function authors(): JsonResponse
    {
        $authors = BlogAuthor::withCount('posts')
            ->orderBy('name', 'asc')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $authors
        ]);
    }
    
    /**
     * Get single author with their posts
     */
    public function author($id): JsonResponse
    {
        $author = BlogAuthor::with(['posts' => function($query) {
            $query->where('status', 'published')
                  ->orderBy('published_at', 'desc')
                  ->limit(10);
        }])->find($id);
        
        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }
    
    /**
     * Get all blog tags with post counts
     */
    public function tags(): JsonResponse
    {
        $tags = BlogTag::withCount(['posts' => function($query) {
            $query->where('status', 'published');
        }])
        ->orderBy('name', 'asc')
        ->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $tags
        ]);
    }
    
    /**
     * Get posts by tag
     */
    public function tag($id): JsonResponse
    {
        $tag = BlogTag::with(['posts' => function($query) {
            $query->where('status', 'published')
                  ->orderBy('published_at', 'desc')
                  ->limit(10);
        }])->find($id);
        
        if (!$tag) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tag not found'
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $tag
        ]);
    }
}
