<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGroupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $group = $this->route('group');
        $id = $group?->id_groupe;
        return [
            'nom' => ['required', 'string', 'max:50', 'unique:groupe,nom,' . $id . ',id_groupe'],
            'domaine' => ['required', 'string', 'max:50'],
            'superviseur_id' => ['nullable', 'exists:agent,id_agent'],
        ];
    }
}
