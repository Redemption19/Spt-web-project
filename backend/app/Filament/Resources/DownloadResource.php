<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DownloadResource\Pages;
use App\Filament\Resources\DownloadResource\RelationManagers;
use App\Models\Download;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DownloadResource extends Resource
{
    protected static ?string $model = Download::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-down-tray';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Download Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\Textarea::make('description')
                            ->rows(3)
                            ->columnSpanFull(),
                        
                        Forms\Components\Select::make('category')
                            ->options([
                                'forms' => 'Forms',
                                'brochures' => 'Brochures',
                                'reports' => 'Reports',
                                'guides' => 'Guides',
                                'policies' => 'Policies',
                                'presentations' => 'Presentations',
                                'newsletters' => 'Newsletters',
                                'other' => 'Other',
                            ])
                            ->required(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('File Upload')
                    ->schema([
                        Forms\Components\FileUpload::make('file_path')
                            ->label('File')
                            ->required()
                            ->disk('public')
                            ->directory('downloads')
                            ->acceptedFileTypes([
                                'application/pdf',
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                'application/vnd.ms-excel',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.ms-powerpoint',
                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                'image/jpeg',
                                'image/png',
                                'text/plain',
                            ])
                            ->maxSize(50 * 1024) // 50MB
                            ->columnSpanFull()
                            ->helperText('Accepted file types: PDF, Word, Excel, PowerPoint, Images (JPEG, PNG), Text files. Maximum size: 50MB'),
                    ]),

                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TextInput::make('file_size')
                            ->label('File Size (KB)')
                            ->numeric()
                            ->disabled()
                            ->helperText('Will be automatically calculated on upload'),
                        
                        Forms\Components\TextInput::make('download_count')
                            ->label('Download Count')
                            ->numeric()
                            ->default(0)
                            ->disabled()
                            ->helperText('Automatically tracked'),
                        
                        Forms\Components\Toggle::make('active')
                            ->label('Active')
                            ->default(true),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),
                
                Tables\Columns\TextColumn::make('description')
                    ->limit(50)
                    ->tooltip(function (Download $record): ?string {
                        return $record->description;
                    }),
                
                Tables\Columns\BadgeColumn::make('category')
                    ->colors([
                        'primary' => 'forms',
                        'success' => 'brochures',
                        'info' => 'reports',
                        'warning' => 'guides',
                        'danger' => 'policies',
                        'secondary' => 'presentations',
                        'gray' => 'newsletters',
                        'slate' => 'other',
                    ]),
                
                Tables\Columns\TextColumn::make('file_extension')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pdf' => 'danger',
                        'doc', 'docx' => 'info',
                        'xls', 'xlsx' => 'success',
                        'ppt', 'pptx' => 'warning',
                        'jpg', 'jpeg', 'png' => 'secondary',
                        default => 'gray',
                    }),
                
                Tables\Columns\TextColumn::make('formatted_file_size')
                    ->label('Size')
                    ->sortable(['file_size']),
                
                Tables\Columns\TextColumn::make('download_count')
                    ->label('Downloads')
                    ->sortable()
                    ->alignCenter(),
                
                Tables\Columns\IconColumn::make('active')
                    ->boolean()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'forms' => 'Forms',
                        'brochures' => 'Brochures',
                        'reports' => 'Reports',
                        'guides' => 'Guides',
                        'policies' => 'Policies',
                        'presentations' => 'Presentations',
                        'newsletters' => 'Newsletters',
                        'other' => 'Other',
                    ]),
                
                Tables\Filters\TernaryFilter::make('active'),
                
                Tables\Filters\Filter::make('popular')
                    ->label('Popular Downloads')
                    ->query(fn (Builder $query): Builder => $query->where('download_count', '>=', 100)),
            ])
            ->actions([
                Tables\Actions\Action::make('download')
                    ->label('Download')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->url(fn (Download $record): string => asset('storage/' . $record->file_path))
                    ->openUrlInNewTab()
                    ->action(function (Download $record) {
                        $record->increment('download_count');
                    }),
                
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('toggle_active')
                        ->label('Toggle Active')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                $record->update(['active' => !$record->active]);
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-eye'),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDownloads::route('/'),
            'create' => Pages\CreateDownload::route('/create'),
            'edit' => Pages\EditDownload::route('/{record}/edit'),
        ];
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('active', true)->count();
    }
}
