<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInfo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'age',
        'faculty',
        'faculty_year',
        'crm',
        'occupation_area',
        'specialties',
        'link_facebook',
        'link_instagram',
        'link_twitter',
        'link_doctoralia',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
