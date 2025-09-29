<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'login' => ['required', 'string', 'max:50', 'unique:utilisateur,login'],
            'password' => ['required', 'string', 'min:6'],
            'email' => ['nullable', 'email', 'max:150', 'unique:utilisateur,email'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'Unit_org' => ['nullable', 'exists:unite_org,Num'],
            'date_activation' => ['nullable', 'date'],
            'date_expiration' => ['nullable', 'date'],
            'actif' => ['boolean'],
        ];
    }
}
