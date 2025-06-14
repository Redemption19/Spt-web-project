<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalleryImageResource\Pages;
use App\Filament\Resources\GalleryImageResource\RelationManagers;
use App\Models\GalleryImage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use App\Models\GalleryCategory;

class GalleryImageResource extends Resource
{
    protected static ?string $model = GalleryImage::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Gallery Management';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Image Information')
                    ->schema([
                        Forms\Components\Select::make('category_id')
                            ->label('Category')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description')
                                    ->rows(3),
                            ]),
                        
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\Textarea::make('description')
                            ->rows(3)
                            ->columnSpanFull(),
                        
                        Forms\Components\TextInput::make('alt_text')
                            ->label('Alt Text')
                            ->maxLength(255)
                            ->helperText('Alternative text for accessibility'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Image Upload')
                    ->schema([
                        Forms\Components\FileUpload::make('image_path')
                            ->label('Image')
                            ->required()
                            ->image()
                            ->disk('public')
                            ->directory('gallery')
                            ->imageResizeMode('contain')
                            ->imageResizeTargetWidth('1920')
                            ->imageResizeTargetHeight('1080')
                            ->maxSize(10 * 1024) // 10MB
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->columnSpanFull()
                            ->afterStateUpdated(function ($state, callable $set) {
                                // Auto-set uploaded_at when file is uploaded
                                if ($state) {
                                    $set('uploaded_at', now());
                                }
                            }),
                    ]),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->minValue(0),
                        
                        Forms\Components\Toggle::make('featured')
                            ->label('Featured Image')
                            ->default(false),
                        
                        Forms\Components\Toggle::make('active')
                            ->label('Active')
                            ->default(true),
                        
                        Forms\Components\DateTimePicker::make('uploaded_at')
                            ->label('Upload Date')
                            ->default(now())
                            ->disabled(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TextInput::make('image_size')
                            ->label('File Size (KB)')
                            ->numeric()
                            ->disabled()
                            ->helperText('Automatically calculated'),
                        
                        Forms\Components\TextInput::make('image_dimensions')
                            ->label('Dimensions')
                            ->disabled()
                            ->helperText('Automatically calculated'),
                        
                        Forms\Components\TextInput::make('views')
                            ->label('View Count')
                            ->numeric()
                            ->default(0)
                            ->disabled(),
                    ])
                    ->columns(3)
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Image')
                    ->disk('public')
                    ->size(80)
                    ->square(),
                
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(30),
                
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info'),
                
                Tables\Columns\TextColumn::make('description')
                    ->limit(40)
                    ->tooltip(function (GalleryImage $record): ?string {
                        return $record->description;
                    }),
                
                Tables\Columns\TextColumn::make('formatted_size')
                    ->label('Size')
                    ->sortable(['image_size']),
                
                Tables\Columns\TextColumn::make('image_dimensions')
                    ->label('Dimensions')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('views')
                    ->label('Views')
                    ->sortable()
                    ->alignCenter()
                    ->badge()
                    ->color('gray'),
                
                Tables\Columns\IconColumn::make('featured')
                    ->boolean()
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('active')
                    ->boolean()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('uploaded_at')
                    ->label('Uploaded')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
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
                Tables\Filters\SelectFilter::make('category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload(),
                
                Tables\Filters\TernaryFilter::make('featured'),
                Tables\Filters\TernaryFilter::make('active'),
                
                Tables\Filters\Filter::make('popular')
                    ->label('Popular Images')
                    ->query(fn (Builder $query): Builder => $query->where('views', '>=', 100)),
            ])
            ->actions([
                Tables\Actions\Action::make('view_image')
                    ->label('View')
                    ->icon('heroicon-o-eye')
                    ->url(fn (GalleryImage $record): string => asset('storage/' . $record->image_path))
                    ->openUrlInNewTab()
                    ->action(function (GalleryImage $record) {
                        $record->incrementViews();
                    }),
                
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('toggle_featured')
                        ->label('Toggle Featured')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                $record->update(['featured' => !$record->featured]);
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-star'),
                    
                    Tables\Actions\BulkAction::make('toggle_active')
                        ->label('Toggle Active')
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                $record->update(['active' => !$record->active]);
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-eye'),
                    
                    Tables\Actions\BulkAction::make('move_to_category')
                        ->label('Move to Category')
                        ->form([
                            Forms\Components\Select::make('category_id')
                                ->label('New Category')
                                ->relationship('category', 'name')
                                ->required(),
                        ])
                        ->action(function (array $data, $records) {
                            foreach ($records as $record) {
                                $record->update(['category_id' => $data['category_id']]);
                            }
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-folder'),
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
            'index' => Pages\ListGalleryImages::route('/'),
            'create' => Pages\CreateGalleryImage::route('/create'),
            'edit' => Pages\EditGalleryImage::route('/{record}/edit'),
        ];
    }
}
