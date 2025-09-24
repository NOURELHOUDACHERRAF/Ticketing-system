<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategorieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Nom' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
            'id_grp' => ['required', 'exists:groupe,id_groupe'],
        ];
    }
}
