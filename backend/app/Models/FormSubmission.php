<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class FormSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_type',
        'form_data',
        'submitted_at',
        'status',
        'processed_by',
        'notes',
        'pdf_path',
        'email_sent',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'form_data' => 'array',
        'submitted_at' => 'datetime',
        'email_sent' => 'boolean',
    ];

    // Scopes
    public function scopeByFormType($query, $formType)
    {
        return $query->where('form_type', $formType);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeProcessed($query)
    {
        return $query->where('status', 'processed');
    }

    public function scopeRecent($query, $days = 7)
    {
        return $query->where('submitted_at', '>=', now()->subDays($days));
    }

    // Accessors
    public function getFormattedSubmittedAtAttribute()
    {
        return $this->submitted_at->format('M j, Y \a\t g:i A');
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending' => 'warning',
            'processing' => 'info',
            'processed' => 'success',
            'replied' => 'success',
            'archived' => 'gray',
            default => 'gray',
        };
    }

    public function getStatusLabelAttribute()
    {
        return ucfirst(str_replace('_', ' ', $this->status));
    }

    public function getFormTypeLabelAttribute()
    {
        return ucfirst(str_replace('_', ' ', $this->form_type));
    }

    public function getPdfUrlAttribute()
    {
        return $this->pdf_path ? Storage::url($this->pdf_path) : null;
    }

    // Helper methods
    public function markAsProcessed($processedBy = null, $notes = null)
    {
        $this->update([
            'status' => 'processed',
            'processed_by' => $processedBy,
            'notes' => $notes,
        ]);
    }

    public function markAsReplied($processedBy = null)
    {
        $this->update([
            'status' => 'replied',
            'processed_by' => $processedBy,
        ]);
    }

    public function generatePdf()
    {
        try {
            $html = $this->generatePdfContent();
            
            $pdf = Pdf::loadHTML($html);
            $filename = 'form_submissions/' . $this->form_type . '_' . $this->id . '_' . now()->format('Y-m-d_H-i-s') . '.pdf';
            
            $pdfContent = $pdf->output();
            Storage::disk('public')->put($filename, $pdfContent);
            
            $this->update(['pdf_path' => $filename]);
            
            return $filename;
        } catch (\Exception $e) {
            \Log::error('PDF generation failed for FormSubmission ' . $this->id . ': ' . $e->getMessage());
            return false;
        }
    }

    private function generatePdfContent()
    {
        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Form Submission - ' . $this->form_type_label . '</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    line-height: 1.6;
                    color: #333;
                }
                .header { 
                    text-align: center; 
                    border-bottom: 3px solid #007cba; 
                    padding-bottom: 20px; 
                    margin-bottom: 30px; 
                }
                .header h1 {
                    margin: 0;
                    color: #007cba;
                    font-size: 28px;
                }
                .header h2 {
                    margin: 10px 0;
                    color: #555;
                    font-weight: normal;
                }
                .info-section {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 25px;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                .field { 
                    margin-bottom: 20px; 
                    page-break-inside: avoid;
                }
                .field-label { 
                    font-weight: bold; 
                    color: #007cba; 
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                .field-value { 
                    padding: 10px; 
                    background-color: #f9f9f9; 
                    border-left: 4px solid #007cba;
                    border-radius: 3px;
                    word-wrap: break-word;
                }
                .section-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #007cba;
                    margin: 30px 0 15px 0;
                    padding-bottom: 5px;
                    border-bottom: 2px solid #e9ecef;
                }
                .footer { 
                    margin-top: 40px; 
                    padding-top: 20px; 
                    border-top: 2px solid #e9ecef; 
                    font-size: 12px; 
                    color: #666; 
                    text-align: center;
                }
                .status-badge {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                    color: white;
                    background-color: ' . $this->getStatusBadgeColor() . ';
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Form Submission</h1>
                <h2>' . $this->form_type_label . '</h2>
            </div>
            
            <div class="info-section">
                <div class="info-grid">
                    <div>
                        <strong>Submission ID:</strong> #' . str_pad($this->id, 6, '0', STR_PAD_LEFT) . '<br>
                        <strong>Submitted:</strong> ' . $this->formatted_submitted_at . '
                    </div>
                    <div>
                        <strong>Status:</strong> <span class="status-badge">' . $this->status_label . '</span><br>
                        ' . ($this->processed_by ? '<strong>Processed by:</strong> ' . $this->processed_by . '<br>' : '') . '
                    </div>
                </div>
            </div>';

        // Group form data by type for better organization
        $personalData = [];
        $formSpecificData = [];
        $technicalData = [];
        
        foreach ($this->form_data as $key => $value) {
            if (in_array($key, ['name', 'email', 'phone', 'address'])) {
                $personalData[$key] = $value;
            } elseif (in_array($key, ['ip_address', 'user_agent', 'browser'])) {
                $technicalData[$key] = $value;
            } else {
                $formSpecificData[$key] = $value;
            }
        }

        // Personal Information Section
        if (!empty($personalData)) {
            $html .= '<div class="section-title">Personal Information</div>';
            foreach ($personalData as $key => $value) {
                $label = ucfirst(str_replace('_', ' ', $key));
                $displayValue = is_array($value) ? implode(', ', $value) : $value;
                
                $html .= '
                    <div class="field">
                        <div class="field-label">' . $label . ':</div>
                        <div class="field-value">' . nl2br(htmlspecialchars($displayValue)) . '</div>
                    </div>';
            }
        }

        // Form Specific Data Section
        if (!empty($formSpecificData)) {
            $html .= '<div class="section-title">Form Details</div>';
            foreach ($formSpecificData as $key => $value) {
                $label = ucfirst(str_replace('_', ' ', $key));
                $displayValue = is_array($value) ? implode(', ', $value) : $value;
                
                $html .= '
                    <div class="field">
                        <div class="field-label">' . $label . ':</div>
                        <div class="field-value">' . nl2br(htmlspecialchars($displayValue)) . '</div>
                    </div>';
            }
        }

        // Notes section if any
        if ($this->notes) {
            $html .= '
                <div class="section-title">Administrative Notes</div>
                <div class="field">
                    <div class="field-value">' . nl2br(htmlspecialchars($this->notes)) . '</div>
                </div>';
        }

        $html .= '
            <div class="footer">
                <p><strong>Generated on:</strong> ' . now()->format('M j, Y \a\t g:i A') . '</p>
                <p>This document contains confidential information and should be handled accordingly.</p>
            </div>
        </body>
        </html>';

        return $html;
    }

    private function getStatusBadgeColor()
    {
        return match($this->status) {
            'pending' => '#ffc107',
            'processing' => '#17a2b8',
            'processed' => '#28a745',
            'replied' => '#007bff',
            'archived' => '#6c757d',
            default => '#6c757d',
        };
    }

    public function sendNotification()
    {
        // This would integrate with your email service
        // For now, we'll just mark it as sent
        $this->update(['email_sent' => true]);
        
        // TODO: Implement actual email sending logic
        // Mail::to($adminEmail)->send(new FormSubmissionNotification($this));
    }

    // Static helper methods
    public static function getFormTypes()
    {
        return [
            'contact' => 'Contact Form',
            'application' => 'Application Form',
            'feedback' => 'Feedback Form',
            'support' => 'Support Request',
            'consultation' => 'Consultation Request',
            'complaint' => 'Complaint Form',
            'general' => 'General Inquiry',
        ];
    }

    public static function getStatusOptions()
    {
        return [
            'pending' => 'Pending',
            'processing' => 'Processing',
            'processed' => 'Processed',
            'replied' => 'Replied',
            'archived' => 'Archived',
        ];
    }
}
