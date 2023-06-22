<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\CareUnit;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::updateOrCreate([
            'email'     => 'contato@medhelping.com.br'
        ], [
            'name'      => 'Admin',
            'email'     => 'contato@medhelping.com.br',
            'password'  => bcrypt('!Medhelping123'),
        ]);

        CareUnit::updateOrCreate(['name' => 'PSF',], ['name' => 'PSF']);
        CareUnit::updateOrCreate(['name' => 'PS / UBS',], ['name' => 'PS / UBS']);
        CareUnit::updateOrCreate(['name' => 'UPA',], ['name' => 'UPA']);
        CareUnit::updateOrCreate(['name' => 'Hospital',], ['name' => 'Hospital']);
        CareUnit::updateOrCreate(['name' => 'Santa Casa',], ['name' => 'Santa Casa']);
        
        Category::updateOrCreate(['name' => 'Emergência',], ['name' => 'Emergência']);
        Category::updateOrCreate(['name' => 'Cardiologia',], ['name' => 'Cardiologia']);
        Category::updateOrCreate(['name' => 'Clínica Médica',], ['name' => 'Clínica Médica']);
        Category::updateOrCreate(['name' => 'Pediatria',], ['name' => 'Pediatria']);
        Category::updateOrCreate(['name' => 'Cirurgia',], ['name' => 'Cirurgia']);
        Category::updateOrCreate(['name' => 'G.O',], ['name' => 'G.O']);
        Category::updateOrCreate(['name' => 'Ortopedia',], ['name' => 'Ortopedia']);
        Category::updateOrCreate(['name' => 'Neurologia',], ['name' => 'Neurologia']);
        Category::updateOrCreate(['name' => 'Endócrino',], ['name' => 'Endócrino']);
        Category::updateOrCreate(['name' => 'Anestesia',], ['name' => 'Anestesia']);
        Category::updateOrCreate(['name' => 'Pneumologia',], ['name' => 'Pneumologia']);
        Category::updateOrCreate(['name' => 'Ambulatorial',], ['name' => 'Ambulatorial']);
        Category::updateOrCreate(['name' => 'Enfermaria',], ['name' => 'Enfermaria']);
    }
}
