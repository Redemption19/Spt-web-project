<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'replied_at',
        'replied_by',
        'reply_message',
        'priority',
        'source',
        'ip_address',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
    ];

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopeReplied($query)
    {
        return $query->where('status', 'replied');
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'urgent']);
    }

    public function scopeRecent($query, $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    // Accessors
    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'new' => 'danger',
            'read' => 'warning',
            'replied' => 'success',
            'closed' => 'gray',
            default => 'gray',
        };
    }

    public function getStatusLabelAttribute()
    {
        return ucfirst($this->status);
    }

    public function getPriorityColorAttribute()
    {
        return match($this->priority) {
            'low' => 'gray',
            'normal' => 'info',
            'high' => 'warning',
            'urgent' => 'danger',
            default => 'info',
        };
    }

    public function getPriorityLabelAttribute()
    {
        return ucfirst($this->priority);
    }

    public function getFormattedCreatedAtAttribute()
    {
        return $this->created_at->format('M j, Y \a\t g:i A');
    }

    public function getFormattedRepliedAtAttribute()
    {
        return $this->replied_at ? $this->replied_at->format('M j, Y \a\t g:i A') : null;
    }

    public function getResponseTimeAttribute()
    {
        if (!$this->replied_at) {
            return null;
        }
        
        $diffInHours = $this->created_at->diffInHours($this->replied_at);
        
        if ($diffInHours < 24) {
            return $diffInHours . ' hours';
        } else {
            return $this->created_at->diffInDays($this->replied_at) . ' days';
        }
    }

    // Helper methods
    public function markAsRead()
    {
        if ($this->status === 'new') {
            $this->update(['status' => 'read']);
        }
    }

    public function markAsReplied($repliedBy = null, $replyMessage = null)
    {
        $this->update([
            'status' => 'replied',
            'replied_at' => now(),
            'replied_by' => $repliedBy,
            'reply_message' => $replyMessage,
        ]);
    }

    public function markAsClosed()
    {
        $this->update(['status' => 'closed']);
    }

    public function setPriority($priority)
    {
        if (in_array($priority, ['low', 'normal', 'high', 'urgent'])) {
            $this->update(['priority' => $priority]);
        }
    }

    public function isNew()
    {
        return $this->status === 'new';
    }

    public function isReplied()
    {
        return $this->status === 'replied';
    }

    public function isHighPriority()
    {
        return in_array($this->priority, ['high', 'urgent']);
    }

    // Auto-assign priority based on keywords
    public function assignAutoPriority()
    {
        $urgentKeywords = ['urgent', 'emergency', 'asap', 'immediately', 'critical'];
        $highKeywords = ['important', 'priority', 'soon', 'complaint'];
        
        $content = strtolower($this->subject . ' ' . $this->message);
        
        foreach ($urgentKeywords as $keyword) {
            if (str_contains($content, $keyword)) {
                $this->setPriority('urgent');
                return;
            }
        }
        
        foreach ($highKeywords as $keyword) {
            if (str_contains($content, $keyword)) {
                $this->setPriority('high');
                return;
            }
        }
        
        // Default to normal priority
        $this->setPriority('normal');
    }

    // Static helper methods
    public static function getStatusOptions()
    {
        return [
            'new' => 'New',
            'read' => 'Read',
            'replied' => 'Replied',
            'closed' => 'Closed',
        ];
    }

    public static function getPriorityOptions()
    {
        return [
            'low' => 'Low',
            'normal' => 'Normal',
            'high' => 'High',
            'urgent' => 'Urgent',
        ];
    }

    public static function getSourceOptions()
    {
        return [
            'website' => 'Website',
            'mobile_app' => 'Mobile App',
            'social_media' => 'Social Media',
            'phone' => 'Phone',
            'email' => 'Email',
            'walk_in' => 'Walk-in',
        ];
    }
}
