<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

class Medias extends Model
{
    use HasFactory;
    protected $fillable = [
        'media_name',
        'media_slug',
        'media_description',
        'media_extension',
        'media_provider_id',
        'media_provider',
        'media_provider_ext',
        'media_type'
    ];

    public function projects():BelongsToMany
    {
        return $this->belongsToMany(Projects::class, 'project_media');
    }

}
