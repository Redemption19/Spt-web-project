<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Filament\Resources\TestimonialResource\RelationManagers;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('role')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('company')
                            ->maxLength(255),
                        
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->disk('public')
                            ->directory('testimonials')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('1:1')
                            ->imageResizeTargetWidth('300')
                            ->imageResizeTargetHeight('300'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Testimonial Content')
                    ->schema([
                        Forms\Components\Textarea::make('message')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),
                        
                        Forms\Components\Select::make('category')
                            ->options([
                                'general' => 'General',
                                'pension_scheme' => 'Pension Scheme',
                                'customer_service' => 'Customer Service',
                                'investment' => 'Investment',
                                'retirement_planning' => 'Retirement Planning',
                            ])
                            ->required(),
                        
                        Forms\Components\Select::make('rating')
                            ->options([
                                1 => '1 Star',
                                2 => '2 Stars',
                                3 => '3 Stars',
                                4 => '4 Stars',
                                5 => '5 Stars',
                            ])
                            ->required()
                            ->default(5),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('featured')
                            ->label('Featured Testimonial')
                            ->default(false),
                        
                        Forms\Components\Toggle::make('active')
                            ->label('Active')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->circular()
                    ->size(50),
                
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('role')
                    ->searchable()
                    ->limit(30),
                
                Tables\Columns\TextColumn::make('company')
                    ->searchable()
                    ->limit(30),
                
                Tables\Columns\TextColumn::make('message')
                    ->limit(50)
                    ->tooltip(function (Testimonial $record): ?string {
                        return $record->message;
                    }),
                
                Tables\Columns\BadgeColumn::make('category')
                    ->colors([
                        'primary' => 'general',
                        'success' => 'pension_scheme',
                        'info' => 'customer_service',
                        'warning' => 'investment',
                        'danger' => 'retirement_planning',
                    ]),
                
                Tables\Columns\TextColumn::make('rating')
                    ->formatStateUsing(fn (int $state): string => str_repeat('⭐', $state))
                    ->sortable(),
                
                Tables\Columns\IconColumn::make('featured')
                    ->boolean()
                    ->sortable(),
                
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
                        'general' => 'General',
                        'pension_scheme' => 'Pension Scheme',
                        'customer_service' => 'Customer Service',
                        'investment' => 'Investment',
                        'retirement_planning' => 'Retirement Planning',
                    ]),
                
                Tables\Filters\SelectFilter::make('rating')
                    ->options([
                        1 => '1 Star',
                        2 => '2 Stars',
                        3 => '3 Stars',
                        4 => '4 Stars',
                        5 => '5 Stars',
                    ]),
                
                Tables\Filters\TernaryFilter::make('featured'),
                Tables\Filters\TernaryFilter::make('active'),
            ])
            ->actions([
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
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('active', true)->count();
    }
}
