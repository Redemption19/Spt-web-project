<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroSectionResource\Pages;
use App\Filament\Resources\HeroSectionResource\RelationManagers;
use App\Models\HeroSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class HeroSectionResource extends Resource
{
    protected static ?string $model = HeroSection::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    
    protected static ?string $navigationGroup = 'Content Management';
    
    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Hero Sections';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\Select::make('page')
                            ->options(HeroSection::getAvailablePages())
                            ->required()
                            ->searchable(),
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('subtitle')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Background & Media')
                    ->schema([
                        Forms\Components\FileUpload::make('background_image')
                            ->image()
                            ->imageEditor()
                            ->directory('hero-sections')
                            ->helperText('Upload a high-quality background image for the hero section')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Call to Action')
                    ->schema([
                        Forms\Components\TextInput::make('cta_text')
                            ->label('CTA Button Text')
                            ->placeholder('Get Started')
                            ->maxLength(50),
                        Forms\Components\TextInput::make('cta_link')
                            ->label('CTA Button Link')
                            ->url()
                            ->placeholder('https://example.com/contact'),
                    ])->columns(2),

                Forms\Components\Section::make('Settings & Additional Content')
                    ->schema([
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first'),
                        Forms\Components\Toggle::make('active')
                            ->default(true)
                            ->helperText('Only active hero sections will be displayed'),
                        Forms\Components\KeyValue::make('additional_content')
                            ->label('Additional Content')
                            ->keyLabel('Field Name')
                            ->valueLabel('Content')
                            ->helperText('Add any additional content fields as needed')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('background_image')
                    ->label('Background')
                    ->circular(false)
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('page')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state): string => HeroSection::getAvailablePages()[$state] ?? $state),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->limit(40)
                    ->description(fn (HeroSection $record): string => $record->subtitle ?? ''),
                Tables\Columns\TextColumn::make('cta_text')
                    ->label('CTA Button')
                    ->badge()
                    ->color('success')
                    ->placeholder('No CTA'),
                Tables\Columns\TextColumn::make('order')
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\IconColumn::make('active')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('page')
                    ->options(HeroSection::getAvailablePages()),
                Tables\Filters\TernaryFilter::make('active')
                    ->label('Status')
                    ->boolean()
                    ->trueLabel('Active only')
                    ->falseLabel('Inactive only')
                    ->native(false),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\Action::make('toggle_active')
                        ->label(fn (HeroSection $record): string => $record->active ? 'Deactivate' : 'Activate')
                        ->icon(fn (HeroSection $record): string => $record->active ? 'heroicon-o-eye-slash' : 'heroicon-o-eye')
                        ->color(fn (HeroSection $record): string => $record->active ? 'warning' : 'success')
                        ->action(fn (HeroSection $record) => $record->active ? $record->deactivate() : $record->activate()),
                    Tables\Actions\DeleteAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('activate')
                        ->label('Activate Selected')
                        ->icon('heroicon-o-eye')
                        ->color('success')
                        ->action(fn ($records) => $records->each->activate()),
                    Tables\Actions\BulkAction::make('deactivate')
                        ->label('Deactivate Selected')
                        ->icon('heroicon-o-eye-slash')
                        ->color('warning')
                        ->action(fn ($records) => $records->each->deactivate()),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('page')
            ->defaultSort('order');
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
            'index' => Pages\ListHeroSections::route('/'),
            'create' => Pages\CreateHeroSection::route('/create'),
            'edit' => Pages\EditHeroSection::route('/{record}/edit'),
        ];
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('active', true)->count();
    }
}
