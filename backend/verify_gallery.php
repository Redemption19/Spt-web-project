<?php

require 'vendor/autoload.php';

$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== GALLERY MANAGEMENT SYSTEM DATA VERIFICATION ===\n\n";

// Check Gallery Categories
$categories = App\Models\GalleryCategory::with('images')->get();
echo "GALLERY CATEGORIES (" . $categories->count() . " total):\n";
foreach ($categories as $category) {
    $imageCount = $category->images->count();
    $activeImages = $category->images->where('active', true)->count();
    $featuredImages = $category->images->where('featured', true)->count();
    
    echo "- {$category->name} ({$category->slug})\n";
    echo "  Images: {$imageCount} total, {$activeImages} active, {$featuredImages} featured\n";
    echo "  Status: " . ($category->active ? 'ACTIVE' : 'INACTIVE') . "\n\n";
}

// Check Gallery Images
$images = App\Models\GalleryImage::with('category')->get();
echo "GALLERY IMAGES (" . $images->count() . " total):\n";
foreach ($images as $image) {
    $status = [];
    if ($image->featured) $status[] = 'FEATURED';
    if ($image->active) $status[] = 'ACTIVE';
    $statusText = implode(', ', $status);
    
    echo "- {$image->title} ({$image->category->name})\n";
    echo "  Views: {$image->views} | Size: {$image->formatted_size} | {$statusText}\n";
}

echo "\n";

// Statistics
echo "=== GALLERY STATISTICS ===\n";
echo "Active Categories: " . App\Models\GalleryCategory::where('active', true)->count() . "\n";
echo "Active Images: " . App\Models\GalleryImage::where('active', true)->count() . "\n";
echo "Featured Images: " . App\Models\GalleryImage::where('featured', true)->count() . "\n";
echo "Total Views: " . App\Models\GalleryImage::sum('views') . "\n";

// Most viewed images
echo "\nMOST VIEWED IMAGES:\n";
$mostViewed = App\Models\GalleryImage::with('category')->orderBy('views', 'desc')->limit(5)->get();
foreach ($mostViewed as $image) {
    echo "- {$image->title} ({$image->category->name}): {$image->views} views\n";
}

echo "\n=== GALLERY VERIFICATION COMPLETE ===\n";
