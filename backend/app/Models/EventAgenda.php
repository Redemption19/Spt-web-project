<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class EventAgenda extends Model
{
    use HasFactory;

    protected $table = 'event_agenda';

    protected $fillable = [
        'event_id',
        'time',
        'item',
        'description',
        'speaker',
        'duration_minutes',
        'type',
        'order',
    ];

    protected $casts = [
        'time' => 'datetime:H:i',
    ];

    // Relationships
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // Accessors
    public function getFormattedTimeAttribute()
    {
        return $this->time->format('g:i A');
    }

    public function getEndTimeAttribute()
    {
        return $this->time->addMinutes($this->duration_minutes);
    }

    public function getFormattedEndTimeAttribute()
    {
        return $this->end_time->format('g:i A');
    }

    public function getTimeRangeAttribute()
    {
        return $this->formatted_time . ' - ' . $this->formatted_end_time;
    }

    public function getDurationDisplayAttribute()
    {
        $hours = floor($this->duration_minutes / 60);
        $minutes = $this->duration_minutes % 60;
        
        if ($hours > 0 && $minutes > 0) {
            return $hours . 'h ' . $minutes . 'm';
        } elseif ($hours > 0) {
            return $hours . 'h';
        } else {
            return $minutes . 'm';
        }
    }

    // Scopes
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('time');
    }

    public function scopePresentations($query)
    {
        return $query->where('type', 'presentation');
    }

    public function scopeBreaks($query)
    {
        return $query->where('type', 'break');
    }
}
