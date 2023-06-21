<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'image',
    ];

    public function articleCategories(): HasMany
    {
        return $this->hasMany(ArticleCategory::class);
    }

    public function articles(): HasManyThrough
    {
        return $this->hasManyThrough(Article::class, ArticleCategory::class, 'category_id', 'id', 'id', 'article_id');
    }
}
