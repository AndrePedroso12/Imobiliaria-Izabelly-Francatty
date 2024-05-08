<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ImovelRequest extends FormRequest
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
            "tipo" => ['required'],
            "pretensao" => ['required'],
            "rua" => ['required'],
            "bairro" => ['required'],
            "numero" => ['required'],
            "cidade" => ['required'],
            "complemento" => ['required'],
            "area_construida" => ['required'],
            "area_terreno" => ['required'],
            "qtd_quartos" => ['required'],
            "qtd_Suites" => ['required'],
            "qtd_banheiros" => ['required'],
            "qtd_vagas_garagem" => ['required'],
            "preco" => ['required'],
            "descricao" => ['required'],
            "caracteristics" => ['required'],
            "vendedor" => ['required'],
            "contato_vendedor" => ['required'],
        ];
    }
    /**
     * Get the error messages for the defined validation rules.*
     * @return array
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}
