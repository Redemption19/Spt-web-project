<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsletterSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'name',
        'subscribed_at',
        'status',
        'unsubscribed_at',
        'unsubscribe_reason',
        'preferences',
        'source',
        'ip_address',
        'verification_token',
        'verified_at',
    ];

    protected $casts = [
        'subscribed_at' => 'datetime',
        'unsubscribed_at' => 'datetime',
        'verified_at' => 'datetime',
        'preferences' => 'array',
    ];

    // Boot method to generate verification token
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subscription) {
            if (!$subscription->verification_token) {
                $subscription->verification_token = Str::random(32);
            }
            if (!$subscription->subscribed_at) {
                $subscription->subscribed_at = now();
            }
        });
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeUnsubscribed($query)
    {
        return $query->where('status', 'unsubscribed');
    }

    public function scopeVerified($query)
    {
        return $query->whereNotNull('verified_at');
    }

    public function scopeUnverified($query)
    {
        return $query->whereNull('verified_at');
    }

    public function scopeBySource($query, $source)
    {
        return $query->where('source', $source);
    }

    public function scopeRecent($query, $days = 30)
    {
        return $query->where('subscribed_at', '>=', now()->subDays($days));
    }

    // Accessors
    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'active' => 'success',
            'unsubscribed' => 'gray',
            'bounced' => 'warning',
            'complained' => 'danger',
            default => 'gray',
        };
    }

    public function getStatusLabelAttribute()
    {
        return ucfirst($this->status);
    }

    public function getFormattedSubscribedAtAttribute()
    {
        return $this->subscribed_at->format('M j, Y \a\t g:i A');
    }

    public function getFormattedUnsubscribedAtAttribute()
    {
        return $this->unsubscribed_at ? $this->unsubscribed_at->format('M j, Y \a\t g:i A') : null;
    }

    public function getIsVerifiedAttribute()
    {
        return !is_null($this->verified_at);
    }

    public function getSubscriptionDurationAttribute()
    {
        if ($this->status === 'unsubscribed' && $this->unsubscribed_at) {
            return $this->subscribed_at->diffInDays($this->unsubscribed_at) . ' days';
        }
        
        return $this->subscribed_at->diffInDays(now()) . ' days';
    }

    public function getDisplayNameAttribute()
    {
        return $this->name ?: explode('@', $this->email)[0];
    }

    // Helper methods
    public function verify()
    {
        $this->update([
            'verified_at' => now(),
            'status' => 'active',
        ]);
    }

    public function unsubscribe($reason = null)
    {
        $this->update([
            'status' => 'unsubscribed',
            'unsubscribed_at' => now(),
            'unsubscribe_reason' => $reason,
        ]);
    }

    public function resubscribe()
    {
        $this->update([
            'status' => 'active',
            'unsubscribed_at' => null,
            'unsubscribe_reason' => null,
        ]);
    }

    public function markAsBounced()
    {
        $this->update(['status' => 'bounced']);
    }

    public function markAsComplained()
    {
        $this->update(['status' => 'complained']);
    }

    public function updatePreferences(array $preferences)
    {
        $this->update(['preferences' => $preferences]);
    }

    public function isActive()
    {
        return $this->status === 'active';
    }

    public function isVerified()
    {
        return !is_null($this->verified_at);
    }

    public function canReceiveEmails()
    {
        return $this->isActive() && $this->isVerified();
    }

    public function getVerificationUrl()
    {
        return url('/newsletter/verify/' . $this->verification_token);
    }

    public function getUnsubscribeUrl()
    {
        return url('/newsletter/unsubscribe/' . $this->verification_token);
    }

    // Preferences helpers
    public function getPreference($key, $default = null)
    {
        return $this->preferences[$key] ?? $default;
    }

    public function setPreference($key, $value)
    {
        $preferences = $this->preferences ?? [];
        $preferences[$key] = $value;
        $this->updatePreferences($preferences);
    }

    public function wantsFrequency($frequency)
    {
        return $this->getPreference('frequency', 'weekly') === $frequency;
    }

    public function wantsTopic($topic)
    {
        $topics = $this->getPreference('topics', []);
        return in_array($topic, $topics);
    }

    // Static helper methods
    public static function getStatusOptions()
    {
        return [
            'active' => 'Active',
            'unsubscribed' => 'Unsubscribed',
            'bounced' => 'Bounced',
            'complained' => 'Complained',
        ];
    }

    public static function getSourceOptions()
    {
        return [
            'website' => 'Website',
            'mobile_app' => 'Mobile App',
            'social_media' => 'Social Media',
            'event' => 'Event',
            'referral' => 'Referral',
            'import' => 'Import',
        ];
    }

    public static function getFrequencyOptions()
    {
        return [
            'daily' => 'Daily',
            'weekly' => 'Weekly',
            'monthly' => 'Monthly',
            'quarterly' => 'Quarterly',
        ];
    }

    public static function getTopicOptions()
    {
        return [
            'pension_news' => 'Pension News',
            'investment_tips' => 'Investment Tips',
            'retirement_planning' => 'Retirement Planning',
            'company_updates' => 'Company Updates',
            'industry_insights' => 'Industry Insights',
            'events' => 'Events & Workshops',
        ];
    }
}
