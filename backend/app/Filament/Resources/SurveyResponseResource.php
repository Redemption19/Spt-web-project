<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SurveyResponseResource\Pages;
use App\Filament\Resources\SurveyResponseResource\RelationManagers;
use App\Models\SurveyResponse;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SurveyResponseResource extends Resource
{
    protected static ?string $model = SurveyResponse::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationGroup = 'Forms & Submissions';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Survey Information')
                    ->schema([
                        Forms\Components\Select::make('survey_type')
                            ->label('Survey Type')
                            ->options(SurveyResponse::getSurveyTypes())
                            ->required(),
                        
                        Forms\Components\DateTimePicker::make('submitted_at')
                            ->required()
                            ->default(now()),
                        
                        Forms\Components\Select::make('source')
                            ->options(SurveyResponse::getSourceOptions())
                            ->required(),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Respondent Information')
                    ->schema([
                        Forms\Components\TextInput::make('respondent_name')
                            ->label('Respondent Name'),
                        
                        Forms\Components\TextInput::make('respondent_email')
                            ->label('Respondent Email')
                            ->email(),
                        
                        Forms\Components\Toggle::make('anonymous')
                            ->label('Anonymous Response'),
                        
                        Forms\Components\TextInput::make('completion_time')
                            ->label('Completion Time (seconds)')
                            ->numeric(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Survey Responses')
                    ->schema([
                        Forms\Components\KeyValue::make('responses')
                            ->label('Survey Answers')
                            ->keyLabel('Question')
                            ->valueLabel('Answer')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Technical Details')
                    ->schema([
                        Forms\Components\TextInput::make('ip_address')
                            ->label('IP Address')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('session_id')
                            ->label('Session ID')
                            ->disabled(),
                    ])
                    ->columns(2)
                    ->collapsible()
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\BadgeColumn::make('survey_type')
                    ->label('Survey Type')
                    ->colors([
                        'primary' => 'customer_satisfaction',
                        'success' => 'product_feedback',
                        'info' => 'service_quality',
                        'warning' => 'market_research',
                        'secondary' => 'user_experience',
                    ])
                    ->formatStateUsing(fn (string $state): string => SurveyResponse::getSurveyTypes()[$state] ?? $state),
                
                Tables\Columns\TextColumn::make('respondent_display_name')
                    ->label('Respondent')
                    ->searchable(['respondent_name', 'respondent_email']),
                
                Tables\Columns\TextColumn::make('response_count')
                    ->label('Responses')
                    ->alignCenter()
                    ->badge()
                    ->color('gray'),
                
                Tables\Columns\TextColumn::make('average_rating')
                    ->label('Avg Rating')
                    ->alignCenter()
                    ->badge()
                    ->color(fn ($state) => match(true) {
                        $state >= 8 => 'success',
                        $state >= 6 => 'warning',
                        $state < 6 => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => $state ? number_format($state, 1) . '/10' : 'N/A'),
                
                Tables\Columns\TextColumn::make('formatted_completion_time')
                    ->label('Duration')
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\IconColumn::make('anonymous')
                    ->boolean()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('source')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state): string => SurveyResponse::getSourceOptions()[$state] ?? $state)
                    ->toggleable(isToggledHiddenByDefault: true),
                
                Tables\Columns\TextColumn::make('submitted_at')
                    ->label('Submitted')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('survey_type')
                    ->options(SurveyResponse::getSurveyTypes()),
                
                Tables\Filters\SelectFilter::make('source')
                    ->options(SurveyResponse::getSourceOptions()),
                
                Tables\Filters\TernaryFilter::make('anonymous'),
                
                Tables\Filters\Filter::make('high_ratings')
                    ->label('High Ratings (8+)')
                    ->query(function (Builder $query): Builder {
                        return $query->get()->filter(function ($record) {
                            return $record->average_rating >= 8;
                        })->pluck('id')->pipe(function ($ids) use ($query) {
                            return $query->whereIn('id', $ids);
                        });
                    }),
                
                Tables\Filters\Filter::make('low_ratings')
                    ->label('Low Ratings (<6)')
                    ->query(function (Builder $query): Builder {
                        return $query->get()->filter(function ($record) {
                            return $record->average_rating && $record->average_rating < 6;
                        })->pluck('id')->pipe(function ($ids) use ($query) {
                            return $query->whereIn('id', $ids);
                        });
                    }),
                
                Tables\Filters\Filter::make('quick_responses')
                    ->label('Quick Responses (<1 min)')
                    ->query(fn (Builder $query): Builder => $query->where('completion_time', '<', 60)),
            ])
            ->actions([
                Tables\Actions\Action::make('view_responses')
                    ->label('View Responses')
                    ->icon('heroicon-o-eye')
                    ->modalContent(function (SurveyResponse $record) {
                        $responses = $record->responses ?? [];
                        $content = '<div class="space-y-4">';
                        
                        foreach ($responses as $question => $answer) {
                            $content .= '<div>';
                            $content .= '<strong>' . ucfirst(str_replace('_', ' ', $question)) . ':</strong><br>';
                            
                            if (is_array($answer)) {
                                $content .= implode(', ', $answer);
                            } else {
                                $content .= nl2br(htmlspecialchars($answer));
                            }
                            
                            $content .= '</div>';
                        }
                        
                        $content .= '</div>';
                        
                        return new \Illuminate\Support\HtmlString($content);
                    })
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close'),
                
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('export_responses')
                        ->label('Export Responses')
                        ->action(function ($records) {
                            return static::exportToCSV($records);
                        })
                        ->icon('heroicon-o-arrow-down-tray')
                        ->color('success'),
                ]),
            ])
            ->defaultSort('submitted_at', 'desc');
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
            'index' => Pages\ListSurveyResponses::route('/'),
            'create' => Pages\CreateSurveyResponse::route('/create'),
            'edit' => Pages\EditSurveyResponse::route('/{record}/edit'),
        ];
    }
    
    public static function exportToCSV($records)
    {
        $filename = 'survey-responses-' . date('Y-m-d-H-i-s') . '.csv';
        $filepath = storage_path('app/exports/' . $filename);
        
        // Ensure exports directory exists
        if (!file_exists(dirname($filepath))) {
            mkdir(dirname($filepath), 0755, true);
        }
        
        $file = fopen($filepath, 'w');
        
        // Get all unique question keys from all responses
        $allQuestions = collect($records)->flatMap(function ($record) {
            return array_keys($record->responses ?? []);
        })->unique()->values()->toArray();
        
        // CSV headers
        $headers = array_merge([
            'ID',
            'Survey Type',
            'Respondent Name',
            'Respondent Email',
            'Anonymous',
            'Completion Time (minutes)',
            'Source',
            'Submitted At',
            'IP Address'
        ], $allQuestions);
        
        fputcsv($file, $headers);
        
        // CSV data
        foreach ($records as $record) {
            $row = [
                $record->id,
                $record->survey_type,
                $record->respondent_name ?? '',
                $record->respondent_email ?? '',
                $record->anonymous ? 'Yes' : 'No',
                $record->completion_time ? round($record->completion_time / 60, 2) : '',
                $record->source,
                $record->submitted_at->format('Y-m-d H:i:s'),
                $record->ip_address ?? ''
            ];
            
            // Add response data
            foreach ($allQuestions as $question) {
                $answer = $record->responses[$question] ?? '';
                if (is_array($answer)) {
                    $answer = implode('; ', $answer);
                }
                $row[] = $answer;
            }
            
            fputcsv($file, $row);
        }
        
        fclose($file);
        
        // Return file download response
        return response()->download($filepath, $filename)->deleteFileAfterSend();
    }
}
