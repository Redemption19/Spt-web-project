<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Submit contact form
     */
    public function submit(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            // Create form submission record
            $submission = FormSubmission::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'form_type' => 'contact',
                'subject' => $request->subject,
                'message' => $request->message,
                'status' => 'pending',
                'submitted_at' => now(),
            ]);
            
            // Here you could send an email notification
            // Mail::to('admin@yoursite.com')->send(new ContactFormSubmitted($submission));
            
            return response()->json([
                'status' => 'success',
                'message' => 'Thank you for your message. We will get back to you soon.',
                'data' => [
                    'id' => $submission->id,
                    'submitted_at' => $submission->submitted_at
                ]
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit form. Please try again.'
            ], 500);
        }
    }
    
    /**
     * Request callback
     */
    public function requestCallback(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'preferred_time' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:1000',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            // Create callback request
            $submission = FormSubmission::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'form_type' => 'callback',
                'message' => $request->message . ($request->preferred_time ? "\nPreferred time: " . $request->preferred_time : ''),
                'status' => 'pending',
                'submitted_at' => now(),
            ]);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Callback request submitted successfully. We will contact you soon.',
                'data' => [
                    'id' => $submission->id,
                    'submitted_at' => $submission->submitted_at
                ]
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to submit callback request. Please try again.'
            ], 500);
        }
    }
}
