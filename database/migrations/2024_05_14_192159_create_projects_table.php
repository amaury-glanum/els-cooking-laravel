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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('project_date')->nullable();
            $table->string('project_place')->nullable();
            $table->string('project_category')->nullable();
            $table->string('project_title');
            $table->string('project_extract')->nullable();
            $table->text('project_teaser')->nullable();
            $table->text('project_description')->nullable();
            $table->text('project_goal')->nullable();
            $table->text('project_method')->nullable();
            $table->text('project_results')->nullable();
            $table->string('project_single_url')->nullable();
            $table->json('project_infos')->nullable();
            $table->json('project_meta')->nullable();
            $table->string('project_publish_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
