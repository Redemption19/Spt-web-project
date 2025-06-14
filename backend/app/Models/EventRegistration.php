<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'name',
        'email',
        'phone',
        'organization',
        'position',
        'special_requirements',
        'status',
        'registered_at',
        'checked_in_at',
        'additional_info',
    ];

    protected $casts = [
        'registered_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'additional_info' => 'array',
    ];

    // Relationships
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // Validation rules
    public static function validationRules($eventId = null)
    {
        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                $eventId ? Rule::unique('event_registrations')->where('event_id', $eventId) : 'unique:event_registrations,email'
            ],
            'phone' => 'nullable|string|regex:/^[\+]?[0-9\s\-\(\)]+$/|max:20',
            'organization' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'special_requirements' => 'nullable|string|max:1000',
        ];
    }

    public static function validationMessages()
    {
        return [
            'name.required' => 'Please provide your full name.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered for this event.',
            'phone.regex' => 'Please provide a valid phone number.',
        ];
    }

    // Accessors
    public function getFormattedRegisteredAtAttribute()
    {
        return $this->registered_at ? $this->registered_at->format('M j, Y g:i A') : null;
    }

    public function getFormattedCheckedInAtAttribute()
    {
        return $this->checked_in_at ? $this->checked_in_at->format('M j, Y g:i A') : null;
    }

    public function getStatusBadgeAttribute()
    {
        $badges = [
            'confirmed' => ['text' => 'Confirmed', 'color' => 'success'],
            'pending' => ['text' => 'Pending', 'color' => 'warning'],
            'cancelled' => ['text' => 'Cancelled', 'color' => 'danger'],
            'attended' => ['text' => 'Attended', 'color' => 'info'],
        ];

        return $badges[$this->status] ?? ['text' => 'Unknown', 'color' => 'secondary'];
    }

    public function getIsAttendedAttribute()
    {
        return $this->status === 'attended';
    }

    public function getIsConfirmedAttribute()
    {
        return $this->status === 'confirmed';
    }

    public function getIsCancelledAttribute()
    {
        return $this->status === 'cancelled';
    }

    // Scopes
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopeAttended($query)
    {
        return $query->where('status', 'attended');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeByEvent($query, $eventId)
    {
        return $query->where('event_id', $eventId);
    }

    // Methods
    public function confirm()
    {
        $this->update(['status' => 'confirmed']);
        $this->event->updateAttendeeCount();
    }

    public function cancel()
    {
        $this->update(['status' => 'cancelled']);
        $this->event->updateAttendeeCount();
    }

    public function checkIn()
    {
        $this->update([
            'status' => 'attended',
            'checked_in_at' => now()
        ]);
    }

    public function sendConfirmationEmail()
    {
        // Implementation for sending confirmation email
        // This would typically use Laravel's Mail facade
    }

    public function sendReminderEmail()
    {
        // Implementation for sending reminder email
    }
}
