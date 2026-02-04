<?php

namespace Database\Seeders;

use App\Models\App;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitKmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        App::updateOrCreate(
            ['slug' => 'app1'],
            ['name' => 'App1', 'description' => 'Pengelolaan konten App1']
        );
        App::updateOrCreate(
            ['slug' => 'app2'],
            ['name' => 'App2', 'description' => 'Pengelolaan konten App2']
        );

        App::updateOrCreate(
            ['slug' => 'app3'],
            ['name' => 'App3', 'description' => 'Pengelolaan konten App3']
        );

        User::updateOrCreate(
            ['email' => 'superadmin@kms.test'],
            [
                'name' => ' Super Admin',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ]
        );
        
        User::updateOrCreate(
            ['email' => 'admin@kms.test'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
    }
}
