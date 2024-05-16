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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('comprador')->nullable();
            $table->float('total')->nullable();
            $table->float('subTotal')->nullable();
            $table->string('formaPago')->nullable();
            $table->float('descuento')->nullable();
            $table->tinyInteger('nproductos')->nullable();
            $table->tinyInteger('totalproductos')->nullable();
            $table->longText('productos')->nullable();
            $table->integer('transaction_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
