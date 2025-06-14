<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Download extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'category',
        'file_size',
        'download_count',
        'file_type',
        'version',
        'active',
        'featured',
        'requires_login',
        'tags',
        'published_at',
        'last_downloaded_at',
    ];

    protected $casts = [
        'active' => 'boolean',
        'featured' => 'boolean',
        'requires_login' => 'boolean',
        'tags' => 'array',
        'published_at' => 'datetime',
        'last_downloaded_at' => 'datetime',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopePublished($query)
    {
        return $query->where('published_at', '<=', now());
    }

    public function scopePopular($query, $minDownloads = 10)
    {
        return $query->where('download_count', '>=', $minDownloads);
    }

    public function scopePublic($query)
    {
        return $query->where('requires_login', false);
    }

    // Accessors
    public function getFileSizeHumanAttribute()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }

    public function getFileUrlAttribute()
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }

    public function getDownloadUrlAttribute()
    {
        return route('downloads.download', $this->id);
    }

    public function getFileExtensionAttribute()
    {
        return pathinfo($this->file_path, PATHINFO_EXTENSION);
    }

    public function getIsPopularAttribute()
    {
        return $this->download_count >= 50; // Consider popular if downloaded 50+ times
    }

    public function getPublishedDateFormattedAttribute()
    {
        return $this->published_at ? $this->published_at->format('F j, Y') : null;
    }

    // Methods
    public static function getAvailableCategories()
    {
        return [
            'forms' => 'Forms & Applications',
            'guides' => 'Guides & Manuals',
            'reports' => 'Reports & Documents',
            'brochures' => 'Brochures & Flyers',
            'presentations' => 'Presentations',
            'policies' => 'Policies & Procedures',
            'newsletters' => 'Newsletters',
            'annual-reports' => 'Annual Reports',
        ];
    }

    public static function getAvailableFileTypes()
    {
        return [
            'pdf' => 'PDF Document',
            'doc' => 'Word Document',
            'docx' => 'Word Document (DOCX)',
            'xls' => 'Excel Spreadsheet',
            'xlsx' => 'Excel Spreadsheet (XLSX)',
            'ppt' => 'PowerPoint Presentation',
            'pptx' => 'PowerPoint Presentation (PPTX)',
            'zip' => 'ZIP Archive',
            'jpg' => 'JPEG Image',
            'png' => 'PNG Image',
        ];
    }

    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }

    public function activate()
    {
        $this->update(['active' => true]);
    }

    public function deactivate()
    {
        $this->update(['active' => false]);
    }

    public function markAsFeatured()
    {
        $this->update(['featured' => true]);
    }

    public function unmarkAsFeatured()
    {
        $this->update(['featured' => false]);
    }

    public function publish()
    {
        $this->update([
            'published_at' => now(),
            'active' => true,
        ]);
    }

    public function getFileSize()
    {
        if (Storage::exists($this->file_path)) {
            return Storage::size($this->file_path);
        }
        return 0;
    }

    public function updateFileSize()
    {
        $this->update(['file_size' => $this->getFileSize()]);
    }

    public static function getFeaturedDownloads($limit = 6)
    {
        return static::active()
            ->featured()
            ->published()
            ->orderBy('download_count', 'desc')
            ->limit($limit)
            ->get();
    }

    public static function getPopularDownloads($limit = 10)
    {
        return static::active()
            ->published()
            ->popular()
            ->orderBy('download_count', 'desc')
            ->limit($limit)
            ->get();
    }

    public static function getByCategory($category, $limit = null)
    {
        $query = static::active()
            ->published()
            ->byCategory($category)
            ->orderBy('download_count', 'desc')
            ->orderBy('published_at', 'desc');

        return $limit ? $query->limit($limit)->get() : $query->get();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($download) {
            if ($download->file_path) {
                $fullPath = storage_path('app/public/' . $download->file_path);
                if (file_exists($fullPath)) {
                    $download->file_size = round(filesize($fullPath) / 1024); // Size in KB
                }
                
                $download->file_type = pathinfo($download->file_path, PATHINFO_EXTENSION);
            }
        });

        static::updating(function ($download) {
            if ($download->isDirty('file_path') && $download->file_path) {
                $fullPath = storage_path('app/public/' . $download->file_path);
                if (file_exists($fullPath)) {
                    $download->file_size = round(filesize($fullPath) / 1024); // Size in KB
                }
                
                $download->file_type = pathinfo($download->file_path, PATHINFO_EXTENSION);
            }
        });
    }
}
