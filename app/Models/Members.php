<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Members extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'prenom',
        'nom',
        'role',
        'email',
        'presentation',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
