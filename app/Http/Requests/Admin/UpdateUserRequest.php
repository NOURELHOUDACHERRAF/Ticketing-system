<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = $this->route('user');
        $id = $user?->id_utilisateur;
        return [
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'login' => ['required', 'string', 'max:50', 'unique:utilisateur,login,' . $id . ',id_utilisateur'],
            'password' => ['nullable', 'string', 'min:6'],
            'email' => ['nullable', 'email', 'max:150', 'unique:utilisateur,email,' . $id . ',id_utilisateur'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'Unit_org' => ['nullable', 'exists:unite_org,Num'],
            'date_activation' => ['nullable', 'date'],
            'date_expiration' => ['nullable', 'date'],
            'actif' => ['boolean'],
        ];
    }
}
