<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->unique()->default((string) \Str::uuid());
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->integer('age')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('college')->nullable();
            $table->integer('college_year')->nullable();
            $table->string('crm')->nullable();
            $table->string('occupation_area')->nullable();
            $table->string('specialties')->nullable();
            $table->string('image')->default('admins/default.png');
            $table->integer('likes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
