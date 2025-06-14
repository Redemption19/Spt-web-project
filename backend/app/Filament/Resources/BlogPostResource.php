<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Filament\Resources\BlogPostResource\RelationManagers;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogAuthor;
use App\Models\BlogTag;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Actions\BulkAction;
use Illuminate\Database\Eloquent\Collection;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    
    protected static ?string $navigationGroup = 'Blog Management';
    
    protected static ?int $navigationSort = 4;
    
    protected static ?string $recordTitleAttribute = 'title';

    // Permission checks
    public static function canViewAny(): bool
    {
        return auth()->user()->can('view_blog') || auth()->user()->isSuperAdmin();
    }

    public static function canCreate(): bool
    {
        return auth()->user()->can('create_blog') || auth()->user()->isSuperAdmin();
    }

    public static function canEdit($record): bool
    {
        return auth()->user()->can('edit_blog') || auth()->user()->isSuperAdmin();
    }

    public static function canDelete($record): bool
    {
        return auth()->user()->can('delete_blog') || auth()->user()->isSuperAdmin();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Post Content')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $context, $state, callable $set) {
                                if ($context === 'create') {
                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                }
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->rules(['regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/']),
                        Forms\Components\Textarea::make('excerpt')
                            ->required()
                            ->maxLength(500)
                            ->rows(3)
                            ->columnSpanFull()
                            ->hint('A brief description of the post (max 500 characters)'),
                        RichEditor::make('content')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'attachFiles',
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'heading',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'table',
                                'undo',
                            ]),
                    ])->columns(2),
                    
                Forms\Components\Section::make('Media & Categorization')
                    ->schema([
                        Forms\Components\FileUpload::make('featured_image')
                            ->image()
                            ->imageEditor()
                            ->directory('blog/featured-images')
                            ->disk('public')
                            ->visibility('public'),
                        Forms\Components\Select::make('category_id')
                            ->label('Category')
                            ->options(BlogCategory::all()->pluck('name', 'id'))
                            ->required()
                            ->searchable()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('description')
                                    ->rows(3),
                            ])
                            ->createOptionUsing(function (array $data): int {
                                return BlogCategory::create($data)->getKey();
                            }),
                        Forms\Components\Select::make('author_id')
                            ->label('Author')
                            ->options(BlogAuthor::all()->pluck('name', 'id'))
                            ->required()
                            ->searchable(),
                        Forms\Components\Select::make('tags')
                            ->label('Tags')
                            ->multiple()
                            ->relationship('tags', 'name')
                            ->options(BlogTag::all()->pluck('name', 'id'))
                            ->searchable()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->createOptionUsing(function (array $data): int {
                                return BlogTag::create($data)->getKey();
                            }),
                    ])->columns(2),
                    
                Forms\Components\Section::make('Publishing & SEO')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                                'archived' => 'Archived',
                            ])
                            ->default('draft')
                            ->required(),
                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Publish Date')
                            ->hint('Leave empty to publish immediately when status is set to published'),
                        Forms\Components\TextInput::make('reading_time_minutes')
                            ->label('Reading Time (minutes)')
                            ->numeric()
                            ->hint('Will be calculated automatically if left empty'),
                        Forms\Components\TextInput::make('meta_title')
                            ->label('SEO Title')
                            ->maxLength(60)
                            ->hint('Recommended: 50-60 characters'),
                        Forms\Components\Textarea::make('meta_description')
                            ->label('SEO Description')
                            ->maxLength(160)                            ->rows(3)
                            ->hint('Recommended: 150-160 characters'),
                        Forms\Components\Textarea::make('keywords')
                            ->label('SEO Keywords')
                            ->hint('Comma-separated keywords'),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Image')
                    ->circular(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->color('gray')
                    ->sortable(),
                Tables\Columns\TextColumn::make('author.name')
                    ->label('Author')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'draft',
                        'success' => 'published',
                        'danger' => 'archived',
                    ]),
                Tables\Columns\TextColumn::make('published_at')
                    ->label('Published')
                    ->dateTime('M j, Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('views')
                    ->badge()
                    ->color('success')
                    ->sortable(),
                Tables\Columns\TextColumn::make('reading_time_minutes')
                    ->label('Read Time')
                    ->suffix(' min')
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
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
                SelectFilter::make('category')
                    ->relationship('category', 'name'),
                SelectFilter::make('author')
                    ->relationship('author', 'name'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('publish')
                    ->action(fn (BlogPost $record) => $record->publish())
                    ->requiresConfirmation()
                    ->icon('heroicon-o-eye')
                    ->color('success')
                    ->visible(fn (BlogPost $record): bool => $record->status !== 'published'),
                Tables\Actions\Action::make('unpublish')
                    ->action(fn (BlogPost $record) => $record->unpublish())
                    ->requiresConfirmation()
                    ->icon('heroicon-o-eye-slash')
                    ->color('warning')
                    ->visible(fn (BlogPost $record): bool => $record->status === 'published'),                Tables\Actions\DeleteAction::make(),
            ])
            ->headerActions([
                Tables\Actions\ExportAction::make()
                    ->exporter(\App\Filament\Exporters\BlogPostExporter::class),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ExportBulkAction::make()
                        ->exporter(\App\Filament\Exporters\BlogPostExporter::class),
                    BulkAction::make('publish')
                        ->action(function (Collection $records) {
                            $records->each->publish();
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-eye')
                        ->color('success'),
                    BulkAction::make('unpublish')
                        ->action(function (Collection $records) {
                            $records->each->unpublish();
                        })
                        ->requiresConfirmation()
                        ->icon('heroicon-o-eye-slash')
                        ->color('warning'),
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
            'index' => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit' => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
