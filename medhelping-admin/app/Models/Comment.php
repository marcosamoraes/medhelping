<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'article_id',
        'comment_id',
        'anonymous_publication',
        'message',
        'type',
    ];

    protected function quantityLikes(): Attribute
    {
        return Attribute::make(get: fn () => $this->likes()->count());
    }

    protected function userLiked(): Attribute
    {
        return Attribute::make(get: function () {
            $user = auth()->user();

            if (!$user) return false;

            return $this->likes()->where('user_id', $user->id)->exists();
        });
    }

    protected function isTheOwner(): Attribute
    {
        return Attribute::make(get: function () {
            $user = auth()->user();

            if (!$user) return false;

            return $this->user_id === $user->id;
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    public function parentComment(): BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }

    public function nodeComments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(CommentLike::class);
    }
}
