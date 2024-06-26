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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('post_title');
            $table->string('post_extract');
            $table->string('slug')->nullable();
            $table->text('body')->nullable();
            $table->json('list')->nullable();
            $table->json('post_infos')->nullable();
            $table->json('post_meta')->nullable();
            $table->string('post_img_url')->nullable();
            $table->string('post_img_name')->nullable();
            $table->string('post_single_url')->nullable();
            $table->string('posts_publish_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
