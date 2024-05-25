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
        Schema::create('medias', function (Blueprint $table) {
            $table->id();
            $table->string('media_category')->nullable();
            $table->string('media_place')->nullable();
            $table->string('media_name')->nullable();
            $table->string('media_slug')->nullable();
            $table->string('media_description')->nullable();
            $table->string('media_extension')->nullable();
            $table->string('media_provider_id')->nullable();
            $table->string('media_provider')->nullable();
            $table->string('media_provider_ext')->nullable();
            $table->string('media_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medias');
    }
};
