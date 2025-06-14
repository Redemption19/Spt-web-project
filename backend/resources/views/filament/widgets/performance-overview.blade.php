<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            Performance Overview
        </x-slot>
        
        <x-slot name="headerEnd">
            <x-filament::icon-button
                icon="heroicon-o-arrow-path"
                tooltip="Refresh data"
                wire:click="$refresh"
            />
        </x-slot>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Revenue Card -->
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-lg text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">Total Revenue</h3>
                        <p class="text-2xl font-bold">GH₵{{ number_format($totalRevenue, 2) }}</p>
                        <p class="text-green-100 text-sm">From paid events</p>
                    </div>
                    <x-heroicon-o-banknotes class="w-10 h-10 text-green-200" />
                </div>
            </div>

            <!-- Average Capacity Card -->
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold">Avg Capacity</h3>
                        <p class="text-2xl font-bold">{{ $avgEventCapacity }}%</p>
                        <p class="text-blue-100 text-sm">Event utilization</p>
                    </div>
                    <x-heroicon-o-chart-bar class="w-10 h-10 text-blue-200" />
                </div>
            </div>

            <!-- Top Events -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Events</h3>
                <div class="space-y-3">
                    @forelse($topEvents as $index => $event)
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <span class="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                                    {{ $index + 1 }}
                                </span>
                                <span class="text-sm text-gray-600 dark:text-gray-300 truncate">
                                    {{ Str::limit($event->title, 20) }}
                                </span>
                            </div>
                            <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {{ $event->registrations_count }} reg.
                            </span>
                        </div>
                    @empty
                        <p class="text-gray-500 text-sm">No events yet</p>
                    @endforelse
                </div>
            </div>

            <!-- Top Categories -->
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Categories</h3>
                <div class="space-y-3">
                    @forelse($topCategories as $index => $category)
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <span class="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                                    {{ $index + 1 }}
                                </span>
                                <span class="text-sm text-gray-600 dark:text-gray-300">
                                    {{ $category->name }}
                                </span>
                            </div>
                            <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {{ $category->posts_count }} posts
                            </span>
                        </div>
                    @empty
                        <p class="text-gray-500 text-sm">No categories yet</p>
                    @endforelse
                </div>
            </div>
        </div>

        <!-- Recent Blog Posts Section -->
        <div class="mt-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Blog Posts</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                @forelse($recentBlogs as $blog)
                    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                        @if($blog->featured_image)
                            <img src="{{ asset('storage/' . $blog->featured_image) }}" 
                                 alt="{{ $blog->title }}" 
                                 class="w-full h-32 object-cover rounded-md mb-3">
                        @endif
                        <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                            {{ Str::limit($blog->title, 50) }}
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300 text-xs mb-3">
                            {{ Str::limit($blog->excerpt ?? strip_tags($blog->content), 80) }}
                        </p>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>{{ $blog->author->name ?? 'Unknown' }}</span>
                            <span>{{ $blog->published_at?->format('M j, Y') }}</span>
                        </div>
                        <div class="mt-2">
                            <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {{ $blog->category->name ?? 'Uncategorized' }}
                            </span>
                        </div>
                    </div>
                @empty
                    <div class="col-span-3 text-center py-8">
                        <x-heroicon-o-document-text class="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p class="text-gray-500">No recent blog posts</p>
                    </div>
                @endforelse
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
