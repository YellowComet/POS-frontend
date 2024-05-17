<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePedidosRequest extends FormRequest
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
            'comprador' => 'required|min:3|max:50|string',
            'total' => 'required|numeric',
            'subTotal' => 'required|numeric',
            'formaPago' => 'required|min:3|max:50|string',
            'descuento' => 'required|numeric',
            'nproductos' => 'required|numeric',
            'totalproductos' => 'required|numeric',
            'productos' => 'required',
            'transaction_id' => 'numeric|unique:pedidos',
        ];
    }
}
