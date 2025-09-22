<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreGroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:50', 'unique:groupe,nom'],
            'domaine' => ['required', 'string', 'max:50'],
            'superviseur_id' => ['nullable', 'exists:agent,id_agent'],
            'cree_par' => ['required', 'exists:admin,id_admin'],
        ];
    }
}
