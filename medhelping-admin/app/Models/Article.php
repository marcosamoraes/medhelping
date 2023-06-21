<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'anonymous_publication',
        'title',
        'image',
        'content',
        'active',
    ];

    /**
     * Get the user that owns the article.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the article categories for the article.
     */
    public function articleCategories(): HasMany
    {
        return $this->hasMany(ArticleCategory::class);
    }

    /**
     * Get the categories for the article.
     */
    public function categories(): HasManyThrough
    {
        return $this->hasManyThrough(Category::class, ArticleCategory::class);
    }

    /**
     * Get the article likes for the article.
     */
    public function articleLikes(): HasMany
    {
        return $this->hasMany(ArticleLike::class);
    }

    /**
     * Get the comments for the article.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
