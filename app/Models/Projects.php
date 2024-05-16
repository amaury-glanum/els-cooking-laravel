<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Projects extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_date',
        'project_place',
        'project_category',
        'project_title',
        'project_extract',
        'project_teaser',
        'project_description',
        'project_goal',
        'project_method',
        'project_results',
        'project_single_url',
        'project_img_url',
        'project_img_name',
        'project_infos',
        'project_meta',
        'project_publish_status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
