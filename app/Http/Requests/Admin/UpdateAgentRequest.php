<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAgentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $agent = $this->route('agent');
        $id = $agent?->id_agent;
        return [
            'login' => ['nullable', 'string', 'max:50', 'unique:agent,login,' . $id . ',id_agent'],
            'password' => ['nullable', 'string', 'min:6'],
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:150', 'unique:agent,email,' . $id . ',id_agent'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'groupe' => ['nullable', 'exists:groupe,id_groupe'],
            'date_activation' => ['nullable', 'date'],
            'date_expiration' => ['nullable', 'date'],
            'est_superviseur' => ['boolean'],
        ];
    }
}
