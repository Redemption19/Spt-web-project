<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GalleryCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'active',
        'sort_order',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    // Boot method to auto-generate slug
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('name') && empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    // Relationships
    public function images()
    {
        return $this->hasMany(GalleryImage::class, 'category_id');
    }

    public function activeImages()
    {
        return $this->hasMany(GalleryImage::class, 'category_id')->where('active', true);
    }

    public function featuredImages()
    {
        return $this->hasMany(GalleryImage::class, 'category_id')->where('featured', true)->where('active', true);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    // Accessors
    public function getImageCountAttribute()
    {
        return $this->images()->count();
    }

    public function getActiveImageCountAttribute()
    {
        return $this->activeImages()->count();
    }

    public function getFeaturedImageCountAttribute()
    {
        return $this->featuredImages()->count();
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    // Helper methods
    public function hasImages()
    {
        return $this->images()->exists();
    }

    public function hasFeaturedImages()
    {
        return $this->featuredImages()->exists();
    }
}
