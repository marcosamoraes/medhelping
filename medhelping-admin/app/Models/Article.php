<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Comment;

class Article extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_name',
        'title',
        'image',
        'content',
        'type',
        'active'
    ];

    protected $casts = [
        'id' => 'string'
    ];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }

    public function comments()
    {
        return $this->HasMany(Comment::class)->whereNull('comments.comment_id');
    }
}
