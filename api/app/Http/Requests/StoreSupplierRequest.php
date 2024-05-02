<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'address' => 'required|min:3|max:255',
            'ca_id' => 'required|numeric',
            'provincia_id' => 'required|numeric',
            'ciudad_id' => 'required|numeric',
            'email' => 'required|email',
            'name' => 'required|min:3|max:255',
            'details' => 'max:1000',
            'landmark' => 'max:255',
            'logo' => 'required',
            'phone' => 'required|numeric',
        ];
    }
}
