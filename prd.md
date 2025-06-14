# Backend API Reference (Laravel Implementation)

## 1. Introduction

This document provides a comprehensive reference for the backend API of our Laravel application.

### 1.1. Base URL

All API endpoints are prefixed with the following base URL:

`/api`

(Example: `https://yourdomain.com/api/blog/posts`)

### 1.2. General Considerations

*   **Authentication**: Most endpoints require authentication via Sanctum or Passport. Refer to the [Authentication/Authorization](#9-authenticationauthorization) section for details.
*   **Request Format**: Requests should be made using JSON. The `Content-Type` header should be set to `application/json`. The `Accept` header should also be set to `application/json`.
*   **Response Format**: Responses will be in JSON format, typically namespaced under a `data` key for single resources or collections. Paginated responses will include `links` and `meta` objects.
*   **Error Handling**: Laravel's standard exception handling is used.
    *   `400 Bad Request`: Invalid request data (often includes a `message` and `errors` object with field-specific validation errors).
    *   `401 Unauthorized`: Authentication credentials were not provided or are invalid.
    *   `403 Forbidden`: Authenticated user does not have permission to perform the action.
    *   `404 Not Found`: The requested resource does not exist (e.g., `ModelNotFoundException`).
    *   `405 Method Not Allowed`: The HTTP method is not supported for the endpoint.
    *   `422 Unprocessable Entity`: Validation errors.
    *   `500 Internal Server Error`: An unexpected error occurred on the server.
*   **Pagination**: List endpoints are paginated by default (usually 15 items per page). Use the `page` query parameter (e.g., `?page=2`). Pagination information is included in the `links` (first, last, prev, next) and `meta` (current_page, last_page, per_page, total, etc.) parts of the response.
*   **Filtering and Sorting**: Specific list endpoints may support filtering by certain fields and sorting using query parameters (e.g., `?status=published&sort=-created_at`). Available options will be documented per endpoint. Eloquent API Resources are often used.
*   **API Resources**: Data is typically transformed using Laravel API Resources to control the exact data exposed.
*   **CSRF Protection**: While APIs are typically stateless, ensure appropriate middleware (like `auth:sanctum`) is used if session-based state is involved for web clients.

## 2. Blog Module

### 2.1. Blog Post (`BlogPost`)

**Model (Illustrative):**

```json
{
  "id": "integer (read-only)",
  "title": "string",
  "slug": "string (unique)",
  "content_html": "text (HTML content)",
  "content_markdown": "text (Markdown source, optional)",
  "excerpt": "string (optional, short summary)",
  "featured_image_url": "string (url, optional)",
  "status": "string (e.g., 'draft', 'published', 'archived')",
  "is_featured": "boolean",
  "published_at": "datetime (optional)",
  "author_id": "integer (foreign key to BlogAuthor)",
  "category_id": "integer (foreign key to BlogCategory)",
  "tags": [ // Array of BlogTag objects or their IDs
    { "id": "integer", "name": "string", "slug": "string" }
  ],
  "meta_title": "string (optional, for SEO)",
  "meta_description": "string (optional, for SEO)",
  "view_count": "integer (read-only)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/blog/posts`**: List all published blog posts.
    *   **Query Parameters:** `category` (slug or ID), `author` (slug or ID), `tag` (slug or ID), `status` (string), `featured` (boolean), `sort` (e.g., `-published_at`, `title`), `per_page` (integer).
    *   **Response:** `200 OK` - Paginated list of BlogPost resources.
*   **`POST /api/blog/posts`**: Create a new blog post (requires authentication and authorization).
    *   **Request Body:** BlogPost data (fields like `title`, `content_html`, `category_id`, `author_id`, `status`, `tags` (array of tag IDs or new tag names)).
    *   **Response:** `201 Created` - The created BlogPost resource.
*   **`GET /api/blog/posts/{post_slug_or_id}`**: Retrieve a specific blog post.
    *   **Response:** `200 OK` - The BlogPost resource.
*   **`PUT/PATCH /api/blog/posts/{post_id}`**: Update a specific blog post (requires authentication and authorization).
    *   **Request Body:** Fields to update.
    *   **Response:** `200 OK` - The updated BlogPost resource.
*   **`DELETE /api/blog/posts/{post_id}`**: Delete a specific blog post (requires authentication and authorization).
    *   **Response:** `204 No Content`.
*   **`POST /api/blog/posts/{post_id}/increment-view`**: Increment view count (internal or public with rate limiting).
    *   **Response:** `200 OK` - `{ "view_count": new_count }`.

### 2.2. Blog Category (`BlogCategory`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "name": "string",
  "slug": "string (unique)",
  "description": "text (optional)",
  "parent_id": "integer (nullable, for subcategories)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/blog/categories`**: List all blog categories.
    *   **Query Parameters:** `hierarchical` (boolean, to get nested structure).
    *   **Response:** `200 OK` - List/tree of BlogCategory resources.
*   **`POST /api/blog/categories`**: Create a new blog category (admin).
    *   **Request Body:** `name`, `slug` (optional), `description`, `parent_id`.
    *   **Response:** `201 Created` - The created BlogCategory resource.
*   **`GET /api/blog/categories/{category_slug_or_id}`**: Retrieve a specific category.
    *   **Response:** `200 OK` - The BlogCategory resource.
*   **`PUT/PATCH /api/blog/categories/{category_id}`**: Update a category (admin).
    *   **Response:** `200 OK` - The updated BlogCategory resource.
*   **`DELETE /api/blog/categories/{category_id}`**: Delete a category (admin).
    *   **Response:** `204 No Content`.

### 2.3. Blog Tag (`BlogTag`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "name": "string",
  "slug": "string (unique)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/blog/tags`**: List all blog tags.
    *   **Response:** `200 OK` - List of BlogTag resources.
*   **`POST /api/blog/tags`**: Create a new tag (admin or implicitly via BlogPost creation).
    *   **Response:** `201 Created` - The created BlogTag resource.
*   **`GET /api/blog/tags/{tag_slug_or_id}`**: Retrieve a specific tag.
    *   **Response:** `200 OK` - The BlogTag resource.
*   **`PUT/PATCH /api/blog/tags/{tag_id}`**: Update a tag (admin).
    *   **Response:** `200 OK` - The updated BlogTag resource.
*   **`DELETE /api/blog/tags/{tag_id}`**: Delete a tag (admin).
    *   **Response:** `204 No Content`.

### 2.4. Blog Author (`BlogAuthor` or User Model extension)

**Model (if a separate `BlogAuthor` model exists):**

```json
{
  "id": "integer (read-only)",
  "user_id": "integer (foreign key to User, if authors are also users)",
  "display_name": "string",
  "bio": "text (optional)",
  "avatar_url": "string (url, optional)",
  "slug": "string (unique)",
  "social_links": {
      "twitter": "string (url)",
      "linkedin": "string (url)"
  },
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```
*If authors are just standard Users, refer to a User resource with specific author-related fields.*

**Endpoints (assuming separate `BlogAuthor`):**

*   **`GET /api/blog/authors`**: List all blog authors.
    *   **Response:** `200 OK` - List of BlogAuthor resources.
*   **`GET /api/blog/authors/{author_slug_or_id}`**: Retrieve a specific author.
    *   **Response:** `200 OK` - The BlogAuthor resource.
*(Admin CRUD endpoints for authors would also exist)*

## 3. Events Module

### 3.1. Event (`Event`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "title": "string",
  "slug": "string (unique)",
  "description_html": "text (HTML content)",
  "start_datetime": "datetime",
  "end_datetime": "datetime",
  "timezone": "string (e.g., 'America/New_York')",
  "venue_name": "string (optional)",
  "address_line1": "string (optional)",
  "address_line2": "string (optional)",
  "city": "string (optional)",
  "state_province": "string (optional)",
  "postal_code": "string (optional)",
  "country": "string (optional)",
  "map_link": "string (url, optional)",
  "is_online_event": "boolean",
  "online_event_url": "string (url, optional, if is_online_event is true)",
  "banner_image_url": "string (url, optional)",
  "status": "string (e.g., 'scheduled', 'cancelled', 'past', 'draft')",
  "is_featured": "boolean",
  "registration_deadline": "datetime (optional)",
  "max_attendees": "integer (optional)",
  "current_attendees_count": "integer (read-only)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/events`**: List all published/upcoming events.
    *   **Query Parameters:** `status`, `featured`, `month` (e.g., `YYYY-MM`), `upcoming` (boolean), `past` (boolean), `sort` (`-start_datetime`).
    *   **Response:** `200 OK` - Paginated list of Event resources.
*   **`POST /api/events`**: Create a new event (admin).
    *   **Response:** `201 Created` - The created Event resource.
*   **`GET /api/events/{event_slug_or_id}`**: Retrieve a specific event.
    *   **Response:** `200 OK` - The Event resource, possibly with related EventAgenda and EventSpeaker resources.
*   **`PUT/PATCH /api/events/{event_id}`**: Update an event (admin).
    *   **Response:** `200 OK` - The updated Event resource.
*   **`DELETE /api/events/{event_id}`**: Delete an event (admin).
    *   **Response:** `204 No Content`.

### 3.2. Event Speaker (`EventSpeaker`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "name": "string",
  "slug": "string (unique, optional)",
  "bio": "text (optional)",
  "job_title": "string (optional)",
  "organization": "string (optional)",
  "photo_url": "string (url, optional)",
  "email": "string (email, optional, private)",
  "linkedin_url": "string (url, optional)",
  "twitter_handle": "string (optional)",
  "website_url": "string (url, optional)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/event-speakers`**: List all speakers (globally).
    *   **Response:** `200 OK` - Paginated list of EventSpeaker resources.
*   **`POST /api/event-speakers`**: Create a new speaker (admin).
    *   **Response:** `201 Created` - The created EventSpeaker resource.
*   **`GET /api/event-speakers/{speaker_slug_or_id}`**: Retrieve a specific speaker.
    *   **Response:** `200 OK` - The EventSpeaker resource.
*   **`PUT/PATCH /api/event-speakers/{speaker_id}`**: Update a speaker (admin).
    *   **Response:** `200 OK` - The updated EventSpeaker resource.
*   **`DELETE /api/event-speakers/{speaker_id}`**: Delete a speaker (admin).
    *   **Response:** `204 No Content`.
*   **`POST /api/events/{event_id}/speakers`**: Attach an existing speaker to an event (admin).
    *   **Request Body:** `{ "speaker_id": "integer", "role": "string (optional, e.g., 'Keynote')" }`
    *   **Response:** `200 OK` - Success message or updated event resource.
*   **`DELETE /api/events/{event_id}/speakers/{speaker_id}`**: Detach a speaker from an event (admin).
    *   **Response:** `204 No Content`.

### 3.3. Event Agenda (`EventAgenda`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "event_id": "integer (foreign key to Event)",
  "title": "string",
  "description": "text (optional)",
  "start_time": "time (or datetime if spanning multiple days)",
  "end_time": "time (or datetime)",
  "location": "string (optional, e.g., 'Main Hall', 'Room A')",
  "track": "string (optional, e.g., 'Developer Track', 'Business Track')",
  "speaker_ids": "array of integers (foreign keys to EventSpeaker, optional)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/events/{event_id}/agenda`**: List all agenda items for an event.
    *   **Response:** `200 OK` - List of EventAgenda resources.
*   **`POST /api/events/{event_id}/agenda`**: Create a new agenda item (admin).
    *   **Response:** `201 Created` - The created EventAgenda resource.
*   **`PUT/PATCH /api/agenda/{agenda_id}`**: Update an agenda item (admin).
    *   **Response:** `200 OK` - The updated EventAgenda resource.
*   **`DELETE /api/agenda/{agenda_id}`**: Delete an agenda item (admin).
    *   **Response:** `204 No Content`.

## 4. Gallery Module

### 4.1. Gallery Category (`GalleryCategory`)

**Model:** (Similar to BlogCategory)

```json
{
  "id": "integer (read-only)",
  "name": "string",
  "slug": "string (unique)",
  "description": "text (optional)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```
**Endpoints:** (Similar to BlogCategory admin CRUD)

### 4.2. Gallery Image (`GalleryImage`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "category_id": "integer (foreign key to GalleryCategory, optional)",
  "title": "string (optional)",
  "alt_text": "string (important for accessibility)",
  "description": "text (optional)",
  "file_path": "string (internal storage path)",
  "url": "string (public URL for the image)",
  "thumbnail_url": "string (public URL for the thumbnail)",
  "mime_type": "string",
  "size": "integer (bytes)",
  "width": "integer (pixels)",
  "height": "integer (pixels)",
  "order_column": "integer (for custom sorting, default: 0)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```
Laravel often uses Spatie MediaLibrary for this, which stores media info in a `media` table.

**Endpoints:**

*   **`GET /api/gallery/images`**: List all gallery images.
    *   **Query Parameters:** `category` (slug or ID), `sort` (`-created_at`, `order_column`).
    *   **Response:** `200 OK` - Paginated list of GalleryImage resources.
*   **`POST /api/gallery/images`**: Upload a new gallery image (admin).
    *   **Request (multipart/form-data):** `file` (the image), `category_id` (optional), `title` (optional), `alt_text`.
    *   **Response:** `201 Created` - The created GalleryImage resource.
*   **`GET /api/gallery/images/{image_id}`**: Retrieve image details.
    *   **Response:** `200 OK` - GalleryImage resource.
*   **`PUT/PATCH /api/gallery/images/{image_id}`**: Update image metadata (admin).
    *   **Response:** `200 OK` - Updated GalleryImage resource.
*   **`DELETE /api/gallery/images/{image_id}`**: Delete an image (admin).
    *   **Response:** `204 No Content`.

## 5. Testimonials (`Testimonial`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "author_name": "string",
  "author_title_company": "string (optional, e.g., 'CEO at Company Inc.')",
  "author_avatar_url": "string (url, optional)",
  "body": "text (the testimonial content)",
  "rating": "integer (optional, 1-5)",
  "source": "string (optional, e.g., 'Website Form', 'Email')",
  "is_published": "boolean (default: false)",
  "published_at": "datetime (optional)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/testimonials`**: List all *published* testimonials.
    *   **Query Parameters:** `limit` (integer), `random` (boolean).
    *   **Response:** `200 OK` - List of Testimonial resources.
*   **`GET /api/admin/testimonials`**: List all testimonials for admin.
    *   **Response:** `200 OK` - Paginated list of Testimonial resources.
*   **`POST /api/admin/testimonials`**: Create a testimonial (admin).
    *   **Response:** `201 Created` - Testimonial resource.
*   **`PUT/PATCH /api/admin/testimonials/{testimonial_id}`**: Update a testimonial (admin).
    *   **Response:** `200 OK` - Updated Testimonial resource.
*   **`DELETE /api/admin/testimonials/{testimonial_id}`**: Delete a testimonial (admin).
    *   **Response:** `204 No Content`.

## 6. Downloads (`DownloadableResource` or `Download`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "title": "string",
  "description": "text (optional)",
  "slug": "string (unique, for download link)",
  "file_path": "string (internal storage path)",
  "original_filename": "string",
  "mime_type": "string",
  "size": "integer (bytes)",
  "version": "string (optional)",
  "is_public": "boolean (default: true)",
  "download_count": "integer (read-only)",
  "category_id": "integer (foreign key to a DownloadCategory, optional)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/downloads`**: List public downloadable resources.
    *   **Query Parameters:** `category` (slug or ID).
    *   **Response:** `200 OK` - List of Download resources.
*   **`GET /api/downloads/{download_slug_or_id}/request`**: Request download (e.g., if it requires email submission or terms agreement, or just to track).
    *   **Response:** `200 OK` - `{ "download_url": "/api/downloads/{download_slug_or_id}/serve?token=xyz" }` or direct file if no gate.
*   **`GET /api/downloads/{download_slug_or_id}/serve`**: Serve the file and increment download count.
    *   **Query Parameters:** `token` (if required from `/request` step).
    *   **Response:** File stream.
*   Admin CRUD endpoints for managing downloads.

## 7. Hero Sections (`HeroSection` or `Banner`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "placement_identifier": "string (e.g., 'home_page_main', 'blog_sidebar')",
  "title": "string",
  "subtitle": "text (optional)",
  "cta_text": "string (optional, e.g., 'Learn More')",
  "cta_link": "string (url or internal path)",
  "image_url_desktop": "string (url)",
  "image_url_mobile": "string (url, optional)",
  "video_url": "string (url, optional)",
  "text_alignment": "string (e.g., 'left', 'center', 'right')",
  "order_column": "integer (for sorting multiple items in the same placement)",
  "is_active": "boolean (default: true)",
  "active_period_start": "datetime (optional)",
  "active_period_end": "datetime (optional)",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`GET /api/hero-sections/{placement_identifier}`**: Get active hero sections for a specific placement.
    *   **Response:** `200 OK` - List of HeroSection resources, ordered by `order_column`.
*   Admin CRUD endpoints for managing hero sections.

## 8. Form Submissions & User Interactions

### 8.1. Contact Form (`ContactFormSubmission`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "name": "string",
  "email": "string (email)",
  "phone": "string (optional)",
  "subject": "string (optional)",
  "message_body": "text",
  "ip_address": "string (IP Address)",
  "user_agent": "string",
  "status": "string (e.g., 'new', 'read', 'archived', 'spam', default: 'new')",
  "submitted_at": "datetime (read-only)",
  "notes": "text (internal admin notes, optional)"
}
```

**Endpoints:**

*   **`POST /api/forms/contact`**: Submit a contact form (public).
    *   **Request Body:** `name`, `email`, `message_body`, etc. (with validation).
    *   **Response:** `201 Created` or `200 OK` - `{ "message": "Thank you for your message!" }`.
*   Admin CRUD endpoints for managing submissions.

### 8.2. Newsletter Subscription (`NewsletterSubscription`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "email": "string (email, unique)",
  "first_name": "string (optional)",
  "last_name": "string (optional)",
  "status": "string (e.g., 'subscribed', 'unsubscribed', 'pending_confirmation')",
  "subscribed_at": "datetime (optional)",
  "unsubscribed_at": "datetime (optional)",
  "confirmation_token": "string (optional)",
  "source": "string (optional, e.g., 'footer_form', 'popup')",
  "ip_address": "string",
  "created_at": "datetime (read-only)",
  "updated_at": "datetime (read-only)"
}
```

**Endpoints:**

*   **`POST /api/newsletter/subscribe`**: Subscribe to newsletter (public).
    *   **Request Body:** `email`, `first_name` (optional).
    *   **Response:** `200 OK` or `201 Created` - Success message (may involve confirmation email).
*   **`POST /api/newsletter/confirm`**: Confirm subscription (from link in email).
    *   **Request Body:** `{ "token": "confirmation_token" }`.
    *   **Response:** `200 OK` - Success message.
*   **`POST /api/newsletter/unsubscribe`**: Unsubscribe (from link in email or user setting).
    *   **Request Body:** `{ "email": "string" }` or `{ "token": "unsubscribe_token" }`.
    *   **Response:** `200 OK` - Success message.
*   Admin CRUD endpoints for managing subscribers.

### 8.3. Event Registration (`EventRegistration`)

**Model:**

```json
{
  "id": "integer (read-only)",
  "event_id": "integer (foreign key to Event)",
  "user_id": "integer (foreign key to User, if registered by logged-in user)",
  "name": "string (if anonymous or different from user profile)",
  "email": "string (email, if anonymous or different from user profile)",
  "phone_number": "string (optional)",
  "number_of_tickets": "integer (default: 1)",
  "registration_type": "string (optional, e.g., 'General Admission', 'VIP')",
  "status": "string (e.g., 'confirmed', 'pending_payment', 'cancelled', 'waitlisted')",
  "payment_id": "string (optional, from payment gateway)",
  "notes": "text (optional, special requests)",
  "registered_at": "datetime (read-only)",
  "custom_fields": "json (object for event-specific questions, optional)"
}
```

**Endpoints:**

*   **`POST /api/events/{event_id}/register`**: Register for an event.
    *   **Request Body:** Registration details (`name`, `email`, `number_of_tickets`, `custom_fields` if applicable).
    *   **Response:** `201 Created` - EventRegistration resource (may include payment details link if applicable).
*   **`GET /api/events/{event_id}/registrations`**: List registrations for an event (admin).
    *   **Response:** `200 OK` - Paginated list of EventRegistration resources.
*   Admin CRUD for managing individual registrations.

### 8.4. Survey Response (`SurveyResponse`)

**Model (generic, depends on Survey structure):**

```json
{
  "id": "integer (read-only)",
  "survey_id": "integer (foreign key to Survey model)",
  "user_id": "integer (foreign key to User, optional)",
  "submitted_at": "datetime (read-only)",
  "ip_address": "string",
  "answers": [ // Array of answer objects
    { "question_id": "integer", "answer_value": "mixed (string, array, integer)" }
  ]
}
```
*A `Survey` model with `SurveyQuestion`s would also exist.*

**Endpoints:**

*   **`GET /api/surveys/{survey_slug_or_id}`**: Get survey structure/questions (public).
*   **`POST /api/surveys/{survey_id}/responses`**: Submit a survey response.
    *   **Request Body:** `{ "answers": [...] }`.
    *   **Response:** `201 Created` - Success message.
*   Admin endpoints for viewing survey results.

### 8.5. Generic Form Submission (`FormSubmission`)
(For dynamic forms created in an admin panel)

**Model:**

```json
{
  "id": "integer (read-only)",
  "form_identifier": "string (slug or ID of the dynamic form)",
  "user_id": "integer (foreign key to User, optional)",
  "submitted_at": "datetime (read-only)",
  "ip_address": "string",
  "data": "json (key-value pairs of submitted form data)"
}
```

**Endpoints:**

*   **`POST /api/forms/{form_identifier}/submit`**: Submit a dynamic form.
    *   **Request Body:** Dynamic key-value pairs based on the form definition.
    *   **Response:** `201 Created` - Success message.
*   Admin endpoints for viewing submissions per form.

## 9. Authentication/Authorization

Laravel Sanctum (for SPAs, mobile apps) or Passport (for OAuth2) is typically used.

### 9.1. Using Laravel Sanctum (Token-based for SPAs)

*   **Login:**
    *   **`POST /login` or `/api/login`** (Standard Laravel web route, uses session for web, or issues token for API)
        *   **Request Body:** `{ "email": "user@example.com", "password": "yourpassword", "device_name": "My SPA" (optional for token name) }`
        *   **Response (for API token):** `200 OK` - `{ "token": "your_sanctum_api_token", "user": { ...user_resource... } }`
        *   **Response (for web):** Standard session cookie is set.
*   **Logout:**
    *   **`POST /logout` or `/api/logout`**
        *   **Requires Authentication (cookie or token).**
        *   **Response:** `204 No Content` or redirect. (For tokens, current token is invalidated if stateful, or client just deletes it).
*   **Registration:**
    *   **`POST /register` or `/api/register`**
        *   **Request Body:** `{ "name": "Test User", "email": "test@example.com", "password": "password", "password_confirmation": "password" }`
        *   **Response:** `201 Created` - User resource (and token if configured, or requires login).
*   **Password Reset:** (Standard Laravel Fortify/UI routes)
    *   `POST /forgot-password`
    *   `POST /reset-password`
*   **Authenticated User:**
    *   **`GET /api/user`**: Get the currently authenticated user.
        *   **Requires Authentication.**
        *   **Response:** `200 OK` - User resource.

### 9.2. Using Laravel Passport (OAuth2)

*   **Endpoints:** `/oauth/authorize`, `/oauth/token`, etc.
*   **Grant Types:** Password Grant, Authorization Code, Client Credentials, etc.
*   Refer to Laravel Passport documentation for detailed setup and usage. This is more common for third-party API access.

### 9.3. Roles & Permissions
Often implemented with packages like `spatie/laravel-permission`.
*   Users have Roles. Roles have Permissions.
*   API endpoints and methods are protected by middleware checking for specific permissions or roles (e.g., `middleware('can:edit_posts')`).
*   A `User` resource might include their roles/permissions:
    ```json
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "roles": ["admin", "editor"],
      "permissions": ["edit_posts", "delete_users", "..."]
    }
    ```
**Note:** This Laravel-specific documentation is more detailed. Actual field names, endpoint URLs, and the extent of features (like advanced filtering, specific API resource transformations) will vary based on the precise implementation choices within the Laravel project. File uploads will typically involve `multipart/form-data` requests and may use Laravel's file storage system extensively.
