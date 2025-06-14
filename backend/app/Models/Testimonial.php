<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'company',
        'image',
        'message',
        'category',
        'rating',
        'featured',
        'active',
        'location',
        'testimonial_date',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'active' => 'boolean',
        'testimonial_date' => 'date',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeHighRated($query, $minRating = 4)
    {
        return $query->where('rating', '>=', $minRating);
    }

    public function scopeRecent($query, $days = 30)
    {
        return $query->where('testimonial_date', '>=', now()->subDays($days));
    }

    // Accessors
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function getStarRatingAttribute()
    {
        return str_repeat('★', $this->rating) . str_repeat('☆', 5 - $this->rating);
    }

    public function getShortMessageAttribute()
    {
        return \Illuminate\Support\Str::limit($this->message, 150);
    }

    public function getFormattedDateAttribute()
    {
        return $this->testimonial_date ? $this->testimonial_date->format('F Y') : null;
    }

    public function getFullNameWithRoleAttribute()
    {
        return "{$this->name}, {$this->role} at {$this->company}";
    }

    // Methods
    public static function getAvailableCategories()
    {
        return [
            'general' => 'General',
            'pension-services' => 'Pension Services',
            'customer-support' => 'Customer Support',
            'digital-platform' => 'Digital Platform',
            'financial-planning' => 'Financial Planning',
            'retirement-advice' => 'Retirement Advice',
        ];
    }

    public function markAsFeatured()
    {
        $this->update(['featured' => true]);
    }

    public function unmarkAsFeatured()
    {
        $this->update(['featured' => false]);
    }

    public function activate()
    {
        $this->update(['active' => true]);
    }

    public function deactivate()
    {
        $this->update(['active' => false]);
    }

    public static function getFeaturedTestimonials($limit = 3)
    {
        return static::active()
            ->featured()
            ->highRated()
            ->latest('testimonial_date')
            ->limit($limit)
            ->get();
    }

    public static function getByCategory($category, $limit = null)
    {
        $query = static::active()
            ->byCategory($category)
            ->orderBy('rating', 'desc')
            ->orderBy('testimonial_date', 'desc');

        return $limit ? $query->limit($limit)->get() : $query->get();
    }
}
