<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected $user;

    public function __construct($user)
    {
        // Store the model instance
        $this->user = $user;
    }
    public function toArray(Request $request): array
    {
        $data = [
            "id" => $this->user->id,
            "name" => $this->user->name,
            'email' => $this->user->email,
            'admin' => $this->user->admin ? True : False,
        ];
        return $data;
    }
}
