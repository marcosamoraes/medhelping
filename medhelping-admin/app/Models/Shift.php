<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Comment;

class Shift extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_name',
        'unit',
        'city',
        'date',
        'entry_time',
        'out_time',
        'value',
        'payment_method',
        'description',
    ];

    protected $casts = [
        'id' => 'string'
    ];

    public function user()
    {
        return $this->BelongsTo(User::class);
    }
}
