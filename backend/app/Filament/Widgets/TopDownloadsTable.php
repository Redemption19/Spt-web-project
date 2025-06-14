<?php

namespace App\Filament\Widgets;

use App\Models\Download;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class TopDownloadsTable extends BaseWidget
{
    protected static ?string $heading = 'Most Downloaded Files';
    
    protected static ?int $sort = 9;

    public function table(Table $table): Table
    {
        return $table
            ->query($this->getTableQuery())
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('File Name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->label('Category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'forms' => 'info',
                        'guides' => 'success',
                        'reports' => 'warning',
                        'brochures' => 'danger',
                        'policies' => 'gray',
                        'newsletters' => 'primary',
                        default => 'secondary',
                    }),
                Tables\Columns\TextColumn::make('file_size')
                    ->label('Size')
                    ->formatStateUsing(fn (int $state): string => number_format($state / 1024, 1) . ' KB')
                    ->sortable(),
                Tables\Columns\TextColumn::make('download_count')
                    ->label('Downloads')
                    ->numeric()
                    ->sortable()
                    ->badge()
                    ->color('success'),
                Tables\Columns\IconColumn::make('active')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle'),
            ])
            ->defaultSort('download_count', 'desc')
            ->paginated([10, 25]);
    }

    protected function getTableQuery(): Builder
    {
        return Download::query()->where('active', true);
    }
}
