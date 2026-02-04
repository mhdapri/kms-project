<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    //
    protected $fillable = [
        'name',
        'slug',
        'description'
    ];
    public function contents()
    {
        return $this->hasMany(Content::class);
    }
}
