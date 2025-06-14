<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class NewsletterController extends Controller
{
    /**
     * Subscribe to newsletter
     */
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:100',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Check if email is already subscribed
        $existingSubscription = NewsletterSubscription::where('email', $request->email)->first();
        
        if ($existingSubscription) {
            if ($existingSubscription->status === 'active') {
                return response()->json([
                    'status' => 'error',
                    'message' => 'This email is already subscribed to our newsletter'
                ], 400);
            } else {
                // Reactivate subscription
                $existingSubscription->update([
                    'status' => 'active',
                    'subscribed_at' => now(),
                    'unsubscribed_at' => null,
                    'verification_token' => Str::random(32),
                ]);
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Successfully resubscribed to our newsletter'
                ]);
            }
        }
        
        try {
            // Create new subscription
            $subscription = NewsletterSubscription::create([
                'email' => $request->email,
                'name' => $request->name,
                'source' => $request->source ?? 'website',
                'status' => 'active', // You might want to set this to 'pending' and require email verification
                'subscribed_at' => now(),
                'verification_token' => Str::random(32),
                'ip_address' => $request->ip(),
            ]);
            
            // Here you could send a welcome email or verification email
            // Mail::to($subscription->email)->send(new NewsletterWelcome($subscription));
            
            return response()->json([
                'status' => 'success',
                'message' => 'Successfully subscribed to our newsletter. Thank you!',
                'data' => [
                    'id' => $subscription->id,
                    'subscribed_at' => $subscription->subscribed_at
                ]
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to subscribe. Please try again.'
            ], 500);
        }
    }
    
    /**
     * Verify email subscription
     */
    public function verify($token): JsonResponse
    {
        $subscription = NewsletterSubscription::where('verification_token', $token)->first();
        
        if (!$subscription) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid verification token'
            ], 404);
        }
        
        if ($subscription->verified_at) {
            return response()->json([
                'status' => 'success',
                'message' => 'Email already verified'
            ]);
        }
        
        $subscription->update([
            'verified_at' => now(),
            'status' => 'active'
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Email successfully verified. Thank you for subscribing!'
        ]);
    }
    
    /**
     * Unsubscribe from newsletter
     */
    public function unsubscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'reason' => 'nullable|string|max:500',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $subscription = NewsletterSubscription::where('email', $request->email)
            ->where('status', 'active')
            ->first();
            
        if (!$subscription) {
            return response()->json([
                'status' => 'error',
                'message' => 'No active subscription found for this email'
            ], 404);
        }
        
        $subscription->update([
            'status' => 'unsubscribed',
            'unsubscribed_at' => now(),
            'unsubscribe_reason' => $request->reason,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully unsubscribed from our newsletter'
        ]);
    }
}
