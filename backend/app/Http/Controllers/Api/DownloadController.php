<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class DownloadController extends Controller
{
    /**
     * Get all downloads with pagination and filters
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        $category = $request->get('category');
        $search = $request->get('search');
        
        $query = Download::where('active', true)
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc');
            
        if ($category) {
            $query->where('category', $category);
        }
        
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        $downloads = $query->paginate($perPage);
        
        return response()->json([
            'status' => 'success',
            'data' => $downloads->items(),
            'pagination' => [
                'current_page' => $downloads->currentPage(),
                'last_page' => $downloads->lastPage(),
                'per_page' => $downloads->perPage(),
                'total' => $downloads->total(),
            ]
        ]);
    }
    
    /**
     * Get download categories with counts
     */
    public function categories(): JsonResponse
    {
        $categories = Download::where('active', true)
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }
    
    /**
     * Get downloads by category
     */
    public function byCategory(Request $request, $category): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        
        $downloads = Download::where('active', true)
            ->where('category', $category)
            ->orderBy('featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
            
        return response()->json([
            'status' => 'success',
            'data' => $downloads->items(),
            'category' => $category,
            'pagination' => [
                'current_page' => $downloads->currentPage(),
                'last_page' => $downloads->lastPage(),
                'per_page' => $downloads->perPage(),
                'total' => $downloads->total(),
            ]
        ]);
    }
    
    /**
     * Get featured downloads
     */
    public function featured(): JsonResponse
    {
        $downloads = Download::where('active', true)
            ->where('featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get();
            
        return response()->json([
            'status' => 'success',
            'data' => $downloads
        ]);
    }
    
    /**
     * Download a file
     */
    public function download(Request $request, $id): JsonResponse
    {
        $download = Download::where('active', true)->find($id);
        
        if (!$download) {
            return response()->json([
                'status' => 'error',
                'message' => 'Download not found'
            ], 404);
        }
        
        // Check if login is required
        if ($download->requires_login && !$request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication required for this download'
            ], 401);
        }
        
        // Check if file exists
        if (!Storage::exists($download->file_path)) {
            return response()->json([
                'status' => 'error',
                'message' => 'File not found'
            ], 404);
        }
        
        // Increment download count and update last downloaded timestamp
        $download->increment('download_count');
        $download->update(['last_downloaded_at' => Carbon::now()]);
        
        // Get the file URL for download
        $fileUrl = Storage::url($download->file_path);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Download ready',
            'data' => [
                'download_url' => $fileUrl,
                'filename' => basename($download->file_path),
                'file_size' => $download->file_size,
                'file_type' => $download->file_type,
                'download_count' => $download->download_count,
            ]
        ]);
    }
    
    /**
     * Get user's download history (requires authentication)
     */
    public function userDownloads(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Note: This would require a user_downloads table to track individual user downloads
        // For now, we'll return an empty array or implement a simple solution
        
        return response()->json([
            'status' => 'success',
            'message' => 'User download history not implemented yet',
            'data' => []
        ]);
    }
}
