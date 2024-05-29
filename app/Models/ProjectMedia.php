<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectMedia extends Pivot
{
    protected $table = 'project_media';

    protected $fillable = ['media_id', 'project_id'];

    protected $primaryKey = null;
}
