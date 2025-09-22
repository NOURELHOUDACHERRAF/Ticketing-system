<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUnitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $unit = $this->route('unit');
        $num = $unit?->Num;
        return [
            'Num' => ['required', 'integer', 'unique:unite_org,Num,' . $num . ',Num'],
            'nom' => ['required', 'string', 'max:100'],
            'Abreviation' => ['nullable', 'string', 'max:50'],
        ];
    }
}
