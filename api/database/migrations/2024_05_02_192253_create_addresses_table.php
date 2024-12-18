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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->morphs('addressable');
            $table->string('address')->nullable();
            $table->foreignId('c_a_s_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('provincias_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('ciudads_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->tinyInteger('status')->nullable();
            $table->tinyInteger('type')->nullable()->comment('1 = supplier, 2 = customer present, 3 = customer premanent');
            $table->string('landmark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
