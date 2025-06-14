<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Add missing columns to events table
        Schema::table('events', function (Blueprint $table) {
            if (!Schema::hasColumn('events', 'event_date')) {
                $table->dateTime('event_date')->nullable();
            }
            if (!Schema::hasColumn('events', 'capacity')) {
                $table->integer('capacity')->default(0);
            }
            if (!Schema::hasColumn('events', 'status')) {
                $table->string('status')->default('draft');
            }
            if (!Schema::hasColumn('events', 'registrations_count')) {
                $table->integer('registrations_count')->default(0);
            }
        });

        // Add missing columns to downloads table
        Schema::table('downloads', function (Blueprint $table) {
            if (!Schema::hasColumn('downloads', 'last_downloaded_at')) {
                $table->timestamp('last_downloaded_at')->nullable();
            }
            if (!Schema::hasColumn('downloads', 'download_count')) {
                $table->integer('download_count')->default(0);
            }
            if (!Schema::hasColumn('downloads', 'active')) {
                $table->boolean('active')->default(true);
            }
            if (!Schema::hasColumn('downloads', 'file_size')) {
                $table->integer('file_size')->default(0);
            }
            if (!Schema::hasColumn('downloads', 'category')) {
                $table->string('category')->nullable();
            }
        });

        // Add missing columns to blog_posts table
        Schema::table('blog_posts', function (Blueprint $table) {
            if (!Schema::hasColumn('blog_posts', 'views')) {
                $table->integer('views')->default(0);
            }
            if (!Schema::hasColumn('blog_posts', 'published_at')) {
                $table->timestamp('published_at')->nullable();
            }
            if (!Schema::hasColumn('blog_posts', 'status')) {
                $table->string('status')->default('draft');
            }
        });

        // Add missing columns to form_submissions table
        Schema::table('form_submissions', function (Blueprint $table) {
            if (!Schema::hasColumn('form_submissions', 'form_type')) {
                $table->string('form_type');
            }
            if (!Schema::hasColumn('form_submissions', 'created_at')) {
                $table->timestamps();
            }
            if (!Schema::hasColumn('form_submissions', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('form_submissions', 'email')) {
                $table->string('email')->nullable();
            }
        });

        // Add missing columns to event_registrations table
        Schema::table('event_registrations', function (Blueprint $table) {
            if (!Schema::hasColumn('event_registrations', 'registered_at')) {
                $table->timestamp('registered_at')->nullable();
            }
            if (!Schema::hasColumn('event_registrations', 'status')) {
                $table->string('status')->default('pending');
            }
            if (!Schema::hasColumn('event_registrations', 'name')) {
                $table->string('name');
            }
        });

        // Add missing columns to newsletter_subscriptions table
        Schema::table('newsletter_subscriptions', function (Blueprint $table) {
            if (!Schema::hasColumn('newsletter_subscriptions', 'subscribed_at')) {
                $table->timestamp('subscribed_at')->nullable();
            }
            if (!Schema::hasColumn('newsletter_subscriptions', 'source')) {
                $table->string('source')->nullable();
            }
            if (!Schema::hasColumn('newsletter_subscriptions', 'name')) {
                $table->string('name')->nullable();
            }
        });
    }

    public function down()
    {
        // Remove added columns from events table
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumnIfExists('event_date');
            $table->dropColumnIfExists('capacity');
            $table->dropColumnIfExists('status');
            $table->dropColumnIfExists('registrations_count');
        });

        // Remove added columns from downloads table
        Schema::table('downloads', function (Blueprint $table) {
            $table->dropColumnIfExists('last_downloaded_at');
            $table->dropColumnIfExists('download_count');
            $table->dropColumnIfExists('active');
            $table->dropColumnIfExists('file_size');
            $table->dropColumnIfExists('category');
        });

        // Remove added columns from blog_posts table
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumnIfExists('views');
            $table->dropColumnIfExists('published_at');
            $table->dropColumnIfExists('status');
        });

        // Remove added columns from form_submissions table
        Schema::table('form_submissions', function (Blueprint $table) {
            $table->dropColumnIfExists('form_type');
            $table->dropColumnIfExists('created_at');
            $table->dropColumnIfExists('updated_at');
            $table->dropColumnIfExists('name');
            $table->dropColumnIfExists('email');
        });

        // Remove added columns from event_registrations table
        Schema::table('event_registrations', function (Blueprint $table) {
            $table->dropColumnIfExists('registered_at');
            $table->dropColumnIfExists('status');
            $table->dropColumnIfExists('name');
        });

        // Remove added columns from newsletter_subscriptions table
        Schema::table('newsletter_subscriptions', function (Blueprint $table) {
            $table->dropColumnIfExists('subscribed_at');
            $table->dropColumnIfExists('source');
            $table->dropColumnIfExists('name');
        });
    }
};
