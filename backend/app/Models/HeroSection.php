<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class HeroSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'page',
        'title',
        'subtitle',
        'background_image',
        'cta_text',
        'cta_link',
        'active',
        'order',
        'additional_content',
    ];

    protected $casts = [
        'active' => 'boolean',
        'additional_content' => 'array',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeForPage($query, $page)
    {
        return $query->where('page', $page);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    // Accessors
    public function getBackgroundImageUrlAttribute()
    {
        return $this->background_image ? asset('storage/' . $this->background_image) : null;
    }

    public function getPageTitleAttribute()
    {
        return Str::title(str_replace('-', ' ', $this->page));
    }

    public function getHasCtaAttribute()
    {
        return !empty($this->cta_text) && !empty($this->cta_link);
    }

    // Methods
    public static function getAvailablePages()
    {
        return [
            'home' => 'Home Page',
            'about' => 'About Us',
            'services' => 'Services',
            'contact' => 'Contact Us',
            'blog' => 'Blog',
            'events' => 'Events',
            'pension-calculator' => 'Pension Calculator',
            'member-portal' => 'Member Portal',
        ];
    }

    public function activate()
    {
        $this->update(['active' => true]);
    }

    public function deactivate()
    {
        $this->update(['active' => false]);
    }

    public static function getActiveForPage($page)
    {
        return static::active()
            ->forPage($page)
            ->ordered()
            ->get();
    }
}
