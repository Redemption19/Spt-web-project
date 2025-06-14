<?php

namespace App\Filament\Exporters;

use App\Models\BlogPost;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class BlogPostExporter extends Exporter
{
    protected static ?string $model = BlogPost::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('title'),
            ExportColumn::make('slug'),
            ExportColumn::make('excerpt'),
            ExportColumn::make('category.name')
                ->label('Category'),
            ExportColumn::make('author.name')
                ->label('Author'),
            ExportColumn::make('status'),
            ExportColumn::make('published_at')
                ->label('Published Date'),
            ExportColumn::make('views'),
            ExportColumn::make('reading_time_minutes')
                ->label('Reading Time (minutes)'),
            ExportColumn::make('meta_title')
                ->label('SEO Title'),
            ExportColumn::make('meta_description')
                ->label('SEO Description'),
            ExportColumn::make('keywords'),
            ExportColumn::make('created_at')
                ->label('Created Date'),
            ExportColumn::make('updated_at')
                ->label('Updated Date'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your blog post export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
