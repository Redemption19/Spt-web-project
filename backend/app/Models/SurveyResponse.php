<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_type',
        'responses',
        'submitted_at',
        'respondent_email',
        'respondent_name',
        'anonymous',
        'completion_time',
        'source',
        'ip_address',
        'session_id',
    ];

    protected $casts = [
        'responses' => 'array',
        'submitted_at' => 'datetime',
        'anonymous' => 'boolean',
    ];

    // Scopes
    public function scopeBySurveyType($query, $surveyType)
    {
        return $query->where('survey_type', $surveyType);
    }

    public function scopeAnonymous($query)
    {
        return $query->where('anonymous', true);
    }

    public function scopeIdentified($query)
    {
        return $query->where('anonymous', false);
    }

    public function scopeBySource($query, $source)
    {
        return $query->where('source', $source);
    }

    public function scopeRecent($query, $days = 30)
    {
        return $query->where('submitted_at', '>=', now()->subDays($days));
    }

    public function scopeCompletedQuickly($query, $maxSeconds = 60)
    {
        return $query->where('completion_time', '<=', $maxSeconds);
    }

    public function scopeCompletedSlowly($query, $minSeconds = 300)
    {
        return $query->where('completion_time', '>=', $minSeconds);
    }

    // Accessors
    public function getSurveyTypeLabelAttribute()
    {
        return ucfirst(str_replace('_', ' ', $this->survey_type));
    }

    public function getFormattedSubmittedAtAttribute()
    {
        return $this->submitted_at->format('M j, Y \a\t g:i A');
    }

    public function getFormattedCompletionTimeAttribute()
    {
        if (!$this->completion_time) {
            return 'Unknown';
        }

        $minutes = floor($this->completion_time / 60);
        $seconds = $this->completion_time % 60;

        if ($minutes > 0) {
            return $minutes . 'm ' . $seconds . 's';
        }
        
        return $seconds . 's';
    }

    public function getRespondentDisplayNameAttribute()
    {
        if ($this->anonymous) {
            return 'Anonymous Respondent';
        }
        
        return $this->respondent_name ?: ($this->respondent_email ? explode('@', $this->respondent_email)[0] : 'Unknown');
    }

    public function getResponseCountAttribute()
    {
        return count($this->responses ?? []);
    }

    public function getAverageRatingAttribute()
    {
        $ratings = [];
        
        foreach ($this->responses as $question => $answer) {
            if (is_numeric($answer) && $answer >= 1 && $answer <= 10) {
                $ratings[] = (float) $answer;
            }
        }
        
        return empty($ratings) ? null : round(array_sum($ratings) / count($ratings), 2);
    }

    // Helper methods
    public function getResponse($questionKey, $default = null)
    {
        return $this->responses[$questionKey] ?? $default;
    }

    public function hasResponse($questionKey)
    {
        return isset($this->responses[$questionKey]) && !empty($this->responses[$questionKey]);
    }

    public function getTextResponses()
    {
        $textResponses = [];
        
        foreach ($this->responses as $question => $answer) {
            if (is_string($answer) && strlen($answer) > 10) { // Assuming longer strings are text responses
                $textResponses[$question] = $answer;
            }
        }
        
        return $textResponses;
    }

    public function getRatingResponses()
    {
        $ratingResponses = [];
        
        foreach ($this->responses as $question => $answer) {
            if (is_numeric($answer) && $answer >= 1 && $answer <= 10) {
                $ratingResponses[$question] = (int) $answer;
            }
        }
        
        return $ratingResponses;
    }

    public function getMultipleChoiceResponses()
    {
        $mcResponses = [];
        
        foreach ($this->responses as $question => $answer) {
            if (is_array($answer) || (is_string($answer) && strlen($answer) <= 50)) {
                $mcResponses[$question] = $answer;
            }
        }
        
        return $mcResponses;
    }

    public function isQuickResponse($maxSeconds = 60)
    {
        return $this->completion_time && $this->completion_time <= $maxSeconds;
    }

    public function isSlowResponse($minSeconds = 300)
    {
        return $this->completion_time && $this->completion_time >= $minSeconds;
    }

    public function isPositive($threshold = 7)
    {
        $averageRating = $this->average_rating;
        return $averageRating && $averageRating >= $threshold;
    }

    public function isNegative($threshold = 4)
    {
        $averageRating = $this->average_rating;
        return $averageRating && $averageRating <= $threshold;
    }

    // Static helper methods
    public static function getSurveyTypes()
    {
        return [
            'customer_satisfaction' => 'Customer Satisfaction',
            'product_feedback' => 'Product Feedback',
            'service_quality' => 'Service Quality',
            'market_research' => 'Market Research',
            'user_experience' => 'User Experience',
            'employee_feedback' => 'Employee Feedback',
            'event_feedback' => 'Event Feedback',
            'website_feedback' => 'Website Feedback',
        ];
    }

    public static function getSourceOptions()
    {
        return [
            'website' => 'Website',
            'email' => 'Email',
            'mobile_app' => 'Mobile App',
            'social_media' => 'Social Media',
            'qr_code' => 'QR Code',
            'in_person' => 'In Person',
        ];
    }

    // Analytics methods
    public static function getResponseStats($surveyType = null)
    {
        $query = static::query();
        
        if ($surveyType) {
            $query->where('survey_type', $surveyType);
        }
        
        return [
            'total_responses' => $query->count(),
            'anonymous_responses' => $query->where('anonymous', true)->count(),
            'identified_responses' => $query->where('anonymous', false)->count(),
            'average_completion_time' => $query->avg('completion_time'),
            'recent_responses' => $query->where('submitted_at', '>=', now()->subDays(7))->count(),
        ];
    }

    public static function getAverageRatingBySurveyType()
    {
        return static::selectRaw('survey_type, responses')
            ->get()
            ->groupBy('survey_type')
            ->map(function ($responses) {
                $allRatings = [];
                
                foreach ($responses as $response) {
                    $ratings = [];
                    foreach ($response->responses as $answer) {
                        if (is_numeric($answer) && $answer >= 1 && $answer <= 10) {
                            $ratings[] = (float) $answer;
                        }
                    }
                    if (!empty($ratings)) {
                        $allRatings = array_merge($allRatings, $ratings);
                    }
                }
                
                return empty($allRatings) ? 0 : round(array_sum($allRatings) / count($allRatings), 2);
            });
    }
}
