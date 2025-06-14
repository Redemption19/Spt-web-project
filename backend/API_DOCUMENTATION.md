# API Documentation

## Base URL
```
http://your-domain.com/api/v1
```

## Authentication
Some endpoints require authentication using Laravel Sanctum. Include the Bearer token in the Authorization header:
```
Authorization: Bearer {your-token}
```

## Response Format
All API responses follow this format:
```json
{
    "status": "success|error",
    "message": "Optional message",
    "data": "Response data",
    "pagination": "Pagination info (for paginated responses)"
}
```

## Endpoints

### Blog API

#### Get All Blog Posts
```
GET /blog
```
**Parameters:**
- `per_page` (optional): Number of items per page (default: 12)
- `search` (optional): Search term for title, excerpt, or content

**Response:**
```json
{
    "status": "success",
    "data": [...],
    "pagination": {...}
}
```

#### Get Featured Blog Posts
```
GET /blog/featured
```

#### Get Blog Categories
```
GET /blog/categories
```

#### Get Posts by Category
```
GET /blog/categories/{category-slug}
```

#### Get Single Blog Post
```
GET /blog/{post-slug}
```

#### Increment Post Views
```
POST /blog/{post-slug}/view
```

### Events API

#### Get All Events
```
GET /events
```
**Parameters:**
- `per_page` (optional): Number of items per page (default: 12)
- `type` (optional): Filter by event type
- `region` (optional): Filter by region
- `status` (optional): Filter by status (default: active)

#### Get Upcoming Events
```
GET /events/upcoming
```
**Parameters:**
- `limit` (optional): Number of events to return (default: 6)

#### Get Featured Events
```
GET /events/featured
```

#### Get Single Event
```
GET /events/{event-slug}
```

#### Register for Event
```
POST /events/{event-slug}/register
```
**Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0123456789",
    "organization": "Company Name",
    "position": "Job Title",
    "special_requirements": "Any special needs"
}
```

### Downloads API

#### Get All Downloads
```
GET /downloads
```
**Parameters:**
- `per_page` (optional): Number of items per page (default: 12)
- `category` (optional): Filter by category
- `search` (optional): Search term

#### Get Download Categories
```
GET /downloads/categories
```

#### Get Downloads by Category
```
GET /downloads/category/{category}
```

#### Get Featured Downloads
```
GET /downloads/featured
```

#### Download File
```
GET /downloads/{id}/download
```
**Note:** Some downloads may require authentication

### Gallery API

#### Get Gallery Images
```
GET /gallery
```
**Parameters:**
- `per_page` (optional): Number of items per page (default: 12)
- `category` (optional): Filter by category

#### Get Gallery Categories
```
GET /gallery/categories
```

#### Get Images by Category
```
GET /gallery/category/{category-slug}
```

### Testimonials API

#### Get All Testimonials
```
GET /testimonials
```

#### Get Featured Testimonials
```
GET /testimonials/featured
```

### Hero Sections API

#### Get All Hero Sections
```
GET /hero-sections
```

#### Get Active Hero Sections
```
GET /hero-sections/active
```

### Contact API

#### Submit Contact Form
```
POST /contact
```
**Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0123456789",
    "subject": "Inquiry Subject",
    "message": "Your message here"
}
```

#### Request Callback
```
POST /contact/callback
```
**Body:**
```json
{
    "name": "John Doe",
    "phone": "0123456789",
    "preferred_time": "Morning",
    "message": "Optional message"
}
```

### Newsletter API

#### Subscribe to Newsletter
```
POST /newsletter/subscribe
```
**Body:**
```json
{
    "email": "john@example.com",
    "name": "John Doe",
    "source": "website"
}
```

#### Verify Email Subscription
```
GET /newsletter/verify/{token}
```

#### Unsubscribe
```
POST /newsletter/unsubscribe
```
**Body:**
```json
{
    "email": "john@example.com",
    "reason": "Optional reason"
}
```

### Stats API

#### Get General Statistics
```
GET /stats
```
**Response:**
```json
{
    "status": "success",
    "data": {
        "total_events": 25,
        "total_blog_posts": 150,
        "total_downloads": 45,
        "total_subscribers": 1200
    }
}
```

## Protected Endpoints (Require Authentication)

### User Profile
```
GET /user/profile
```

### User Event Registrations
```
GET /user/event-registrations
```

### User Downloads History
```
GET /user/downloads
```

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

## Rate Limiting
API endpoints are rate limited to prevent abuse. Default limits:
- Public endpoints: 60 requests per minute
- Authenticated endpoints: 60 requests per minute

## CORS
CORS is enabled for all API endpoints to allow frontend applications to consume the API.

## Examples

### Fetch Blog Posts (JavaScript)
```javascript
fetch('/api/v1/blog')
    .then(response => response.json())
    .then(data => {
        console.log(data.data); // Blog posts array
    });
```

### Register for Event (JavaScript)
```javascript
fetch('/api/v1/events/pension-webinar-2024/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0123456789'
    })
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        alert('Registration successful!');
    }
});
```
