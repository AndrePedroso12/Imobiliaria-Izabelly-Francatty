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
            'isTop' => ['boolean'],
            'isFavorite' => ['boolean'],
            'isBanner' => ['boolean'],
            "tipo" => ['required'], // Tipo de imóvel é necessário
            "pretensao" => ['required'], // Campo "Modelo" é necessário
            "rua" => ['required'], // Campo "Rua" é necessário
            "bairro" => ['required'], // Campo "Bairro" é necessário
            "numero" => ['required'], // Campo "Número" é necessário
            "cidade" => ['required'], // Campo "Cidade" é necessário
            "monthly" => ['numeric', 'nullable'], // Campo "Condomínio" deve conter apenas números
            "rent" => ['numeric', 'nullable'], // Campo "Condomínio" deve conter apenas números
            "qtd_quartos" => ['numeric'],
            "qtd_Suites" => ['numeric'],
            "qtd_banheiros" => ['numeric'],
            "qtd_vagas_garagem" => ['numeric'],
            "preco" => ['required'], // Campo "Preço" é necessário
            "tags" => ['array'],
            "caracteristics" => ['required', 'array'], // Insira as caracteristicas do imóvel ("tags")
            "vendedor" => ['required'], // Campo "Vendedor" é necessário
            "contato_vendedor" => ['required'], // Campo "Contato Vendedor" é necessário
            "area_construida" => [
                Rule::requiredIf(function () {
                    return $this->area_terreno == null; // É preciso informar "Área Terreno" ou "Área Contruída"
                })
            ],
            "area_terreno"  => [
                Rule::requiredIf(function () {
                    return $this->area_construida == null; // É preciso informar "Área Terreno" ou "Área Contruída"
                })
            ],
        ];
    }

    public function messages()
    {
        return [
            "tipo.required" => 'Tipo de imóvel é necessário',
            "pretensao.required" => 'Campo "Modelo" é necessário',
            "rua.required" => 'Campo "Rua" é necessário',
            "bairro.required" => 'Campo "Bairro" é necessário',
            "numero.required" => 'Campo "Número" é necessário',
            "cidade.required" => 'Campo "Cidade" é necessário',
            "monthly.numeric" => 'Campo "Condomínio" deve conter apenas números',
            "preco.required" => 'Campo "Preço" é necessário',
            "caracteristics.required" => 'Insira as caracteristicas do imóvel ("tags")',
            "vendedor.required" => 'Campo "Vendedor" é necessário',
            "contato_vendedor.required" => 'Campo "Contato Vendedor" é necessário',
        ];
    }
    /*

return $this->area_terreno == null; // É preciso informar "Área Terreno" ou "Área Contruída"
return $this->area_construida == null; // É preciso informar "Área Terreno" ou "Área Contruída"
*/
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
}
