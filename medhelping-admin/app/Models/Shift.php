<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shift extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'anonymous_publication',
        'care_unit_id',
        'city',
        'date',
        'entry_time',
        'out_time',
        'value',
        'payment_method',
        'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function careUnit(): BelongsTo
    {
        return $this->belongsTo(CareUnit::class);
    }

    protected function isTheOwner(): Attribute
    {
        return Attribute::make(get: function () {
            $user = auth()->user();

            if (!$user) return false;

            return $this->user_id === $user->id;
        });
    }

    /**
     * Get the comments for the article.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'article_id', 'id')->whereNull('comment_id')->whereType('shift');
    }
}
