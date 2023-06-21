<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->boolean('anonymous_publication')->default(false);
            $table->foreignId('care_unit_id')->constrained();
            $table->string('city');
            $table->date('date');
            $table->time('entry_time');
            $table->time('out_time');
            $table->decimal('value', 10, 2)->nullable();
            $table->string('payment_method')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
