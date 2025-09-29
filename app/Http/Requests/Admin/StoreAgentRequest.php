<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAgentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'login' => ['nullable', 'string', 'max:50', 'unique:agent,login'],
            'password' => ['required', 'string', 'min:6'],
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:150', 'unique:agent,email'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'groupe' => ['nullable', 'exists:groupe,id_groupe'],
            'date_activation' => ['nullable', 'date'],
            'date_expiration' => ['nullable', 'date'],
            'est_superviseur' => ['boolean'],
        ];
    }
}
