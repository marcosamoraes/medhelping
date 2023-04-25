<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use \App\Models\Admin;
use \App\Models\Article;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create admin user
        $admin = Admin::where('email', 'admin@admin.com')->first();
        if (!$admin) {
            Admin::create([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('123456'),
            ]);
        }

        Article::create([
            'user_name' => 'Marcos Moraes',
            'title' => 'Análise Cardiologia',
            'image' => "https://agenciamoraes.com/sites/medhelping/public/images/articles/eu4-1665082284.jpg",
            'content' => 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
            'type' => 'Cardiologia,Emergência,Neurologia,Endócrino'
        ]);

        Article::create([
            'user_name' => 'Marcos 2',
            'title' => 'Testes de coração',
            'image' => "https://agenciamoraes.com/sites/medhelping/public/images/articles/eu4-1665082284.jpg",
            'content' => 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
            'type' => 'Cardiologia,Emergência,Neurologia,Endócrino'
        ]);

        Article::create([
            'user_name' => 'Marcos 3',
            'title' => 'Exames gerais',
            'image' => "https://agenciamoraes.com/sites/medhelping/public/images/articles/eu4-1665082284.jpg",
            'content' => 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
            'type' => 'Cardiologia,Emergência,Neurologia,Endócrino'
        ]);
    }
}
