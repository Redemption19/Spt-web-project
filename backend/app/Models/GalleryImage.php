<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'description',
        'image_path',
        'alt_text',
        'featured',
        'active',
        'sort_order',
        'image_size',
        'image_dimensions',
        'views',
        'uploaded_at',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'active' => 'boolean',
        'uploaded_at' => 'datetime',
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(GalleryCategory::class, 'category_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('title');
    }

    public function scopePopular($query)
    {
        return $query->orderBy('views', 'desc');
    }

    // Accessors
    public function getImageUrlAttribute()
    {
        return $this->image_path ? Storage::url($this->image_path) : null;
    }

    public function getFormattedSizeAttribute()
    {
        if (!$this->image_size) {
            return 'Unknown';
        }

        $size = (int) $this->image_size;
        
        if ($size < 1024) {
            return $size . ' KB';
        } elseif ($size < 1024 * 1024) {
            return round($size / 1024, 1) . ' MB';
        } else {
            return round($size / (1024 * 1024), 1) . ' GB';
        }
    }

    public function getFormattedDimensionsAttribute()
    {
        return $this->image_dimensions ?? 'Unknown';
    }

    public function getCategoryNameAttribute()
    {
        return $this->category ? $this->category->name : 'Uncategorized';
    }

    public function getAltTextDisplayAttribute()
    {
        return $this->alt_text ?: $this->title;
    }

    // Mutators
    public function setImagePathAttribute($value)
    {
        $this->attributes['image_path'] = $value;
        
        // Auto-set uploaded_at if not already set
        if (!$this->uploaded_at) {
            $this->attributes['uploaded_at'] = now();
        }
    }

    // Helper methods
    public function incrementViews()
    {
        $this->increment('views');
    }

    public function isActive()
    {
        return $this->active;
    }

    public function isFeatured()
    {
        return $this->featured;
    }

    public function hasCategory()
    {
        return $this->category_id && $this->category;
    }

    public function getImageInfo()
    {
        if (!$this->image_path || !Storage::exists($this->image_path)) {
            return null;
        }

        $fullPath = Storage::path($this->image_path);
        
        if (!file_exists($fullPath)) {
            return null;
        }

        $imageInfo = getimagesize($fullPath);
        $fileSize = filesize($fullPath);

        return [
            'width' => $imageInfo[0] ?? null,
            'height' => $imageInfo[1] ?? null,
            'dimensions' => isset($imageInfo[0], $imageInfo[1]) ? $imageInfo[0] . 'x' . $imageInfo[1] : null,
            'size_kb' => round($fileSize / 1024, 2),
            'mime_type' => $imageInfo['mime'] ?? null,
        ];
    }

    public function updateImageMetadata()
    {
        $info = $this->getImageInfo();
        
        if ($info) {
            $this->update([
                'image_size' => $info['size_kb'],
                'image_dimensions' => $info['dimensions'],
            ]);
        }
    }
}
