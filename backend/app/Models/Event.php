<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'banner',
        'date',
        'time',
        'venue',
        'capacity',
        'current_attendees',
        'type',
        'region',
        'status',
        'registration_link',
        'map_link',
        'is_featured',
        'price',
        'requirements',
        'contact_info',
        'registration_deadline',
        'event_date',
        'registrations_count',
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime:H:i',
        'registration_deadline' => 'datetime',
        'contact_info' => 'array',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'event_date' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->title);
            }
        });

        static::updating(function ($event) {
            if ($event->isDirty('title') && empty($event->slug)) {
                $event->slug = Str::slug($event->title);
            }
        });
    }

    // Relationships
    public function speakers()
    {
        return $this->hasMany(EventSpeaker::class)->orderBy('event_speakers.order');
    }

    public function agenda()
    {
        return $this->hasMany(EventAgenda::class)->orderBy('event_agenda.order');
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function confirmedRegistrations()
    {
        return $this->hasMany(EventRegistration::class)->where('status', 'confirmed');
    }

    public function attendedRegistrations()
    {
        return $this->hasMany(EventRegistration::class)->where('status', 'attended');
    }

    // Scopes
    public function scopeUpcoming($query)
    {
        return $query->where('date', '>=', now()->toDateString())
                    ->where('status', 'published')
                    ->orderBy('date', 'asc');
    }

    public function scopePast($query)
    {
        return $query->where('date', '<', now()->toDateString())
                    ->orderBy('date', 'desc');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByRegion($query, $region)
    {
        return $query->where('region', $region);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'published');
    }

    // Accessors
    public function getFormattedDateAttribute()
    {
        return $this->date->format('F j, Y');
    }

    public function getFormattedTimeAttribute()
    {
        return $this->time->format('g:i A');
    }

    public function getFormattedDateTimeAttribute()
    {
        return $this->formatted_date . ' at ' . $this->formatted_time;
    }

    public function getBannerUrlAttribute()
    {
        return $this->banner ? asset('storage/' . $this->banner) : null;
    }

    public function getAvailableSpotsAttribute()
    {
        return max(0, $this->capacity - $this->current_attendees);
    }

    public function getIsFullAttribute()
    {
        return $this->current_attendees >= $this->capacity;
    }

    public function getIsUpcomingAttribute()
    {
        return $this->date >= now()->toDateString();
    }

    public function getIsPastAttribute()
    {
        return $this->date < now()->toDateString();
    }

    public function getCanRegisterAttribute()
    {
        return $this->status === 'published' 
            && $this->is_upcoming 
            && !$this->is_full
            && (!$this->registration_deadline || $this->registration_deadline > now());
    }

    public function getRegistrationStatusAttribute()
    {
        if ($this->status !== 'published') {
            return 'Not available';
        }
        
        if ($this->is_past) {
            return 'Event completed';
        }
        
        if ($this->registration_deadline && $this->registration_deadline < now()) {
            return 'Registration closed';
        }
        
        if ($this->is_full) {
            return 'Fully booked';
        }
        
        return 'Open for registration';
    }

    // Methods
    public function updateAttendeeCount()
    {
        $this->current_attendees = $this->confirmedRegistrations()->count();
        $this->save();
    }

    public function addRegistration($data)
    {
        if (!$this->can_register) {
            throw new \Exception('Registration is not available for this event.');
        }

        $registration = $this->registrations()->create($data);
        $this->updateAttendeeCount();
        
        return $registration;
    }

    public function publish()
    {
        $this->update(['status' => 'published']);
    }

    public function cancel()
    {
        $this->update(['status' => 'cancelled']);
    }

    public function complete()
    {
        $this->update(['status' => 'completed']);
    }

    public function getKeynoteSpeakers()
    {
        return $this->speakers()->where('is_keynote', true)->get();
    }

    public function getRegularSpeakers()
    {
        return $this->speakers()->where('is_keynote', false)->get();
    }
}
