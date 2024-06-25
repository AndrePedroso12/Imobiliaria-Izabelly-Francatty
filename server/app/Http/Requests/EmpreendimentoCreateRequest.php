<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EmpreendimentoCreateRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required"],
            "logo" => ["required"],
            "mainImage" => ["required"]
        ];
    }
    public function messages()
    {
        return [
            "name.required" => "Informe o Nome do Empreendimento",
            "logo.required" => "Necessário incluir uma logo",
            "mainImage.required" => "Necessário incluir uma imagem",
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}
