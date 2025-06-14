<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSpeaker extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'name',
        'bio',
        'photo',
        'company',
        'position',
        'linkedin',
        'twitter',
        'email',
        'is_keynote',
        'order',
    ];

    protected $casts = [
        'is_keynote' => 'boolean',
    ];

    // Relationships
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // Accessors
    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }

    public function getFullNameAttribute()
    {
        return $this->name;
    }

    public function getDisplayTitleAttribute()
    {
        $title = $this->name;
        if ($this->position && $this->company) {
            $title .= ', ' . $this->position . ' at ' . $this->company;
        } elseif ($this->position) {
            $title .= ', ' . $this->position;
        } elseif ($this->company) {
            $title .= ', ' . $this->company;
        }
        return $title;
    }

    public function getSocialLinksAttribute()
    {
        $links = [];
        if ($this->linkedin) {
            $links['linkedin'] = $this->linkedin;
        }
        if ($this->twitter) {
            $links['twitter'] = $this->twitter;
        }
        return $links;
    }

    // Scopes
    public function scopeKeynote($query)
    {
        return $query->where('is_keynote', true);
    }

    public function scopeRegular($query)
    {
        return $query->where('is_keynote', false);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
