import React from "react";
import Acomodacao from "../../interfaces/acomodacoes.js";
import { NomeAcomadacao } from "../../enumeradores/tipoAcomodacao.js";

interface AcomodacaoFormProps {
  formData: Acomodacao;
  setFormData: React.Dispatch<React.SetStateAction<Acomodacao>>;
  isAdding?: boolean; 
}

const AcomodacaoForm: React.FC<AcomodacaoFormProps> = ({
  formData,
  setFormData,
  isAdding = false, 
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div>
        <label
          htmlFor="nomeAcomadacao"
          className="block text-sm font-medium text-gray-700"
        >
          {/* 3. Muda o label se for 'isAdding' */}
          {isAdding ? "Selecione o Tipo de Acomodação" : "Nome da Acomodação"}
        </label>
        <select
          id="nomeAcomadacao"
          name="nomeAcomadacao"
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          value={formData.nomeAcomadacao}
          onChange={handleChange}
        >
          {Object.values(NomeAcomadacao).map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Esconde o resto do formulário se estiver Adicionando */}
      {!isAdding && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="camaSolteiro"
                className="block text-sm font-medium text-gray-700"
              >
                Camas de Solteiro
              </label>
              <input
                type="number"
                id="camaSolteiro"
                name="camaSolteiro"
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={Number(formData.camaSolteiro ?? 0)}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="camaCasal"
                className="block text-sm font-medium text-gray-700"
              >
                Camas de Casal
              </label>
              <input
                type="number"
                id="camaCasal"
                name="camaCasal"
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={Number(formData.camaCasal ?? 0)}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="suite"
                className="block text-sm font-medium text-gray-700"
              >
                Suítes
              </label>
              <input
                type="number"
                id="suite"
                name="suite"
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={Number(formData.suite ?? 0)}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="garagem"
                className="block text-sm font-medium text-gray-700"
              >
                Vagas de Garagem
              </label>
              <input
                type="number"
                id="garagem"
                name="garagem"
                className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={Number(formData.garagem ?? 0)}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="climatizacao"
              name="climatizacao"
              type="checkbox"
              className="form-checkbox h-4 w-4 text-brand-600 border-gray-300 rounded"
              checked={Boolean(formData.climatizacao)}
              onChange={handleChange}
            />
            <label
              htmlFor="climatizacao"
              className="ml-2 block text-sm text-gray-900"
            >
              Possui Climatização
            </label>
          </div>
        </>
      )}
    </form>
  );
};

export default AcomodacaoForm;