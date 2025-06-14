<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormSubmission;
use App\Models\ContactForm;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class FormSubmissionController extends Controller
{
    /**
     * Get all form submissions (admin only)
     */
    public function index(Request $request): JsonResponse
    {
        $query = FormSubmission::with(['user'])
            ->orderBy('submitted_at', 'desc');
            
        // Filter by form type
        if ($request->has('form_type')) {
            $query->where('form_type', $request->form_type);
        }
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by date range
        if ($request->has('from_date')) {
            $query->whereDate('submitted_at', '>=', $request->from_date);
        }
        
        if ($request->has('to_date')) {
            $query->whereDate('submitted_at', '<=', $request->to_date);
        }
        
        $submissions = $query->paginate(15);
        
        return response()->json([
            'status' => 'success',
            'data' => $submissions
        ]);
    }
    
    /**
     * Get single form submission
     */
    public function show($id): JsonResponse
    {
        $submission = FormSubmission::with(['user'])->find($id);
        
        if (!$submission) {
            return response()->json([
                'status' => 'error',
                'message' => 'Form submission not found'
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $submission
        ]);
    }
    
    /**
     * Update form submission status
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,processed,replied,archived',
            'notes' => 'nullable|string'
        ]);
        
        $submission = FormSubmission::find($id);
        
        if (!$submission) {
            return response()->json([
                'status' => 'error',
                'message' => 'Form submission not found'
            ], 404);
        }
        
        $submission->update([
            'status' => $request->status,
            'notes' => $request->notes,
            'processed_by' => auth()->user()->name ?? 'System',
            'processed_at' => now()
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Form submission status updated successfully',
            'data' => $submission
        ]);
    }
    
    /**
     * Get form submission statistics
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total_submissions' => FormSubmission::count(),
            'pending_submissions' => FormSubmission::where('status', 'pending')->count(),
            'processed_submissions' => FormSubmission::where('status', 'processed')->count(),
            'submissions_this_week' => FormSubmission::where('submitted_at', '>=', now()->startOfWeek())->count(),
            'submissions_this_month' => FormSubmission::where('submitted_at', '>=', now()->startOfMonth())->count(),
            'by_form_type' => FormSubmission::selectRaw('form_type, COUNT(*) as count')
                ->groupBy('form_type')
                ->get(),
            'by_status' => FormSubmission::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->get(),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }
    
    /**
     * Get contact form submissions
     */
    public function contactForms(Request $request): JsonResponse
    {
        $query = ContactForm::orderBy('created_at', 'desc');
        
        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by priority
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }
        
        $contactForms = $query->paginate(15);
        
        return response()->json([
            'status' => 'success',
            'data' => $contactForms
        ]);
    }
    
    /**
     * Get single contact form
     */
    public function contactForm($id): JsonResponse
    {
        $contactForm = ContactForm::find($id);
        
        if (!$contactForm) {
            return response()->json([
                'status' => 'error',
                'message' => 'Contact form not found'
            ], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $contactForm
        ]);
    }
    
    /**
     * Update contact form status
     */
    public function updateContactStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|in:new,read,replied,closed',
            'reply_message' => 'nullable|string'
        ]);
        
        $contactForm = ContactForm::find($id);
        
        if (!$contactForm) {
            return response()->json([
                'status' => 'error',
                'message' => 'Contact form not found'
            ], 404);
        }
        
        $updateData = ['status' => $request->status];
        
        if ($request->status === 'replied' && $request->reply_message) {
            $updateData['reply_message'] = $request->reply_message;
            $updateData['replied_by'] = auth()->user()->name ?? 'System';
            $updateData['replied_at'] = now();
        }
        
        $contactForm->update($updateData);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Contact form status updated successfully',
            'data' => $contactForm
        ]);
    }
    
    /**
     * Get contact form statistics
     */
    public function contactStats(): JsonResponse
    {
        $stats = [
            'total_contacts' => ContactForm::count(),
            'new_contacts' => ContactForm::where('status', 'new')->count(),
            'replied_contacts' => ContactForm::where('status', 'replied')->count(),
            'high_priority' => ContactForm::whereIn('priority', ['high', 'urgent'])->count(),
            'contacts_this_week' => ContactForm::where('created_at', '>=', now()->startOfWeek())->count(),
            'contacts_this_month' => ContactForm::where('created_at', '>=', now()->startOfMonth())->count(),
            'by_priority' => ContactForm::selectRaw('priority, COUNT(*) as count')
                ->groupBy('priority')
                ->get(),
            'by_status' => ContactForm::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->get(),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }
}
