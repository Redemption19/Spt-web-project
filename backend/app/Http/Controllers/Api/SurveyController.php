<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    /**
     * Submit survey response
     */
    public function submit(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'survey_type' => 'required|string|max:100',
            'responses' => 'required|array',
            'respondent_name' => 'nullable|string|max:255',
            'respondent_email' => 'nullable|email|max:255',
            'source' => 'nullable|string|max:100',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            $surveyResponse = SurveyResponse::create([
                'survey_type' => $request->survey_type,
                'responses' => $request->responses,
                'respondent_name' => $request->respondent_name,
                'respondent_email' => $request->respondent_email,
                'source' => $request->source ?? 'website',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'submitted_at' => now(),
            ]);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Survey response submitted successfully',
                'data' => [
                    'id' => $surveyResponse->id,
                    'submitted_at' => $surveyResponse->submitted_at
                ]
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit survey response'
            ], 500);
        }
    }
    
    /**
     * Get survey types available
     */
    public function types(): JsonResponse
    {
        $types = [
            'pension_satisfaction' => 'Pension Satisfaction Survey',
            'service_feedback' => 'Service Feedback',
            'website_usability' => 'Website Usability',
            'event_feedback' => 'Event Feedback',
            'general_feedback' => 'General Feedback'
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $types
        ]);
    }
    
    /**
     * Get survey statistics (public summary)
     */
    public function stats($surveyType = null): JsonResponse
    {
        $query = SurveyResponse::query();
        
        if ($surveyType) {
            $query->where('survey_type', $surveyType);
        }
        
        $stats = [
            'total_responses' => $query->count(),
            'responses_this_month' => (clone $query)->where('submitted_at', '>=', now()->startOfMonth())->count(),
            'average_rating' => $this->calculateAverageRating($query->get()),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }
    
    private function calculateAverageRating($responses)
    {
        if ($responses->isEmpty()) {
            return 0;
        }
        
        $totalRating = 0;
        $ratingCount = 0;
        
        foreach ($responses as $response) {
            if (isset($response->responses['rating'])) {
                $totalRating += (int) $response->responses['rating'];
                $ratingCount++;
            }
        }
        
        return $ratingCount > 0 ? round($totalRating / $ratingCount, 1) : 0;
    }
}
