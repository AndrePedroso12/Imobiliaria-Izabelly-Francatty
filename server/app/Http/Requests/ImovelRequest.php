<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

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
            "qtd_quartos" => ['numeric'],
            "qtd_Suites" => ['numeric'],
            "qtd_banheiros" => ['numeric'],
            "qtd_vagas_garagem" => ['numeric'],
            "preco" => ['required'],
            "descricao" => ['required'],
            "tags" => ['required', 'array'],
            "caracteristics" => ['required', 'array'],
            "vendedor" => ['required'],
            "contato_vendedor" => ['required'],
            "area_construida" => [
                Rule::requiredIf(function () {
                    return $this->area_terreno == null;
                })
            ],
            "area_terreno"  => [
                Rule::requiredIf(function () {
                    return $this->area_construida == null;
                })
            ],
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
