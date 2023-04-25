<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Article;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id',
        'comment_id',
        'user_name',
        'message',
        'likes'
    ];

    protected $casts = [
        'id' => 'string'
    ];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }

    public function article()
    {
        return $this->BelongsTo(Article::class);
    }

    public function reply_comments()
    {
        return $this->HasMany(self::class);
    }
}
