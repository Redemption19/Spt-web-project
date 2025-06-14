<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogAuthor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'avatar',
        'role',
        'bio',
        'twitter',
        'linkedin',
    ];

    public function posts()
    {
        return $this->hasMany(BlogPost::class, 'author_id');
    }

    public function getPostsCountAttribute()
    {
        return $this->posts()->count();
    }

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar && filter_var($this->avatar, FILTER_VALIDATE_URL)) {
            return $this->avatar;
        }
        
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }
        
        return null;
    }
}
