<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::updateOrCreate([
            'email'     => 'admin@medhelping.com.br'
        ], [
            'name'      => 'admin',
            'email'     => 'admin@medhelping.com.br',
            'password'  => bcrypt('!Medhelping123'),
        ]);
    }
}
