<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  protected $fillable = [
    'name',
    'email',
    'age',
    'address',
    'city',
    'college',
    'college_year',
    'crm',
    'occupation_area',
    'specialties',
    'image',
    'likes',
  ];

  protected $casts = [
    'id' => 'string'
  ];
}
