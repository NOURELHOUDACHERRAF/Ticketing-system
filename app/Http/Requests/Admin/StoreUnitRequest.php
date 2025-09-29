<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreUnitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Num' => ['required', 'integer', 'unique:unite_org,Num'],
            'nom' => ['required', 'string', 'max:100'],
            'Abreviation' => ['nullable', 'string', 'max:50'],
        ];
    }
}
