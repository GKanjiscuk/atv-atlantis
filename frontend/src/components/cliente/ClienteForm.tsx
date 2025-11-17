import React from "react";
import Cliente from "../../interfaces/cliente";
import { TipoDocumento } from "../../enumeradores/tipoDocumento";

interface ClienteFormProps {
  formData: Cliente;
  setFormData: React.Dispatch<React.SetStateAction<Cliente>>;
  handleAddTelefone: () => void;
  handleRemoveTelefone: (id: number) => void;
  handleAddDocumento: () => void;
  handleRemoveDocumento: (id: number) => void;
  formErrors: any;
}

//componente de erro
const FormError: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
};

const ClienteForm: React.FC<ClienteFormProps> = ({
  formData,
  setFormData,
  handleAddTelefone,
  handleRemoveTelefone,
  handleAddDocumento,
  handleRemoveDocumento,
  formErrors,
}) => (
  <form onSubmit={(e) => e.preventDefault()}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* --- Nome --- */}
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700"
        >
          Nome
        </label>
        <input
          type="text"
          id="nome"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        />
        <FormError message={formErrors?.nome} />
      </div>
      {/* --- Nome Social --- */}
      <div>
        <label
          htmlFor="nomeSocial"
          className="block text-sm font-medium text-gray-700"
        >
          Nome Social
        </label>
        <input
          type="text"
          id="nomeSocial"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="Nome Social"
          value={formData.nomeSocial}
          onChange={(e) =>
            setFormData({ ...formData, nomeSocial: e.target.value })
          }
        />
        <FormError message={formErrors?.nomeSocial} />
      </div>
      {/* --- Data de Nascimento --- */}
      <div>
        <label
          htmlFor="dataNascimento"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Nascimento
        </label>
        <input
          type="date"
          id="dataNascimento"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          value={
            formData.dataNascimento
              ? new Date(formData.dataNascimento).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              dataNascimento: new Date(e.target.value),
            })
          }
        />
        <FormError message={formErrors?.dataNascimento} />
      </div>
      {/* --- Data de Cadastro --- */}
      <div>
        <label
          htmlFor="dataCadastro"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Cadastro
        </label>
        <input
          type="date"
          id="dataCadastro"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          value={
            formData.dataCadastro
              ? new Date(formData.dataCadastro).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setFormData({ ...formData, dataCadastro: new Date(e.target.value) })
          }
        />
        <FormError message={formErrors?.dataCadastro} />
      </div>
    </div>

    {/* --- Telefones --- */}
    <h5 className="mt-6 mb-3 text-lg font-medium text-gray-800">Telefones</h5>
    <div className="space-y-4">
      {formData.telefones.map((telefone, index) => (
        <div key={telefone.id} className="p-4 border rounded-lg bg-gray-50">
          <label
            htmlFor={`telefone-${telefone.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Telefone {index + 1}
          </label>
          {/*
            ✨ --- ATUALIZAÇÃO AQUI --- ✨
            Usei flexbox para alinhar DDD e Número
          */}
          <div className="flex items-start space-x-2 mt-1">
            
            {/* --- CAMPO DDD ADICIONADO --- */}
            <div className="flex-shrink-0 w-1/4">
              <label htmlFor={`ddd-${telefone.id}`} className="sr-only">DDD</label>
              <input
                type="number"
                id={`ddd-${telefone.id}`}
                className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="DDD"
                value={telefone.ddd}
                onChange={(e) => {
                  const updatedTelefones = [...formData.telefones];
                  updatedTelefones[index].ddd = Number(e.target.value);
                  setFormData({ ...formData, telefones: updatedTelefones });
                }}
              />
              {/* Erro para o DDD */}
              <FormError message={formErrors?.[`telefones.${index}.ddd`]} />
            </div>

            {/* --- CAMPO NÚMERO (com largura ajustada) --- */}
            <div className="flex-grow">
              <label htmlFor={`telefone-${telefone.id}`} className="sr-only">Número</label>
              <input
                type="text"
                id={`telefone-${telefone.id}`}
                className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="Número"
                value={telefone.numero}
                onChange={(e) => {
                  const updatedTelefones = [...formData.telefones];
                  updatedTelefones[index].numero = e.target.value;
                  setFormData({ ...formData, telefones: updatedTelefones });
                }}
              />
              {/* Erro para o número do telefone */}
              <FormError message={formErrors?.[`telefones.${index}.numero`]} />
            </div>

            {/* Botão Remover */}
            {index > 0 && (
              <button
                type="button"
                className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
                onClick={() => handleRemoveTelefone(telefone.id)}
              >
                Remover
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
        onClick={handleAddTelefone}
      >
        Adicionar Telefone
      </button>
    </div>

    {/* --- Documentos --- */}
    <h5 className="mt-6 mb-3 text-lg font-medium text-gray-800">Documentos</h5>
    <div className="space-y-4">
      {formData.documentos.map((documento, index) => (
        <div
          key={documento.id}
          className="p-4 border rounded-lg bg-gray-50 space-y-3"
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Documento {index + 1}</p>
            {index > 0 && (
              <button
                type="button"
                className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
                onClick={() => handleRemoveDocumento(documento.id)}
              >
                Remover
              </button>
            )}
          </div>
          {/* --- Número do Documento --- */}
          <div>
            <label
              htmlFor={`doc-numero-${documento.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Número
            </label>
            <input
              type="text"
              id={`doc-numero-${documento.id}`}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              placeholder="Número do Documento"
              value={documento.numero}
              onChange={(e) => {
                const updatedDocumentos = [...formData.documentos];
                updatedDocumentos[index].numero = e.target.value;
                setFormData({ ...formData, documentos: updatedDocumentos });
              }}
            />
            <FormError message={formErrors?.[`documentos.${index}.numero`]} />
          </div>
          {/* --- Tipo do Documento --- */}
          <div>
            <label
              htmlFor={`doc-tipo-${documento.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Tipo
            </label>
            <select
              id={`doc-tipo-${documento.id}`}
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              value={documento.tipo}
              onChange={(e) => {
                const updatedDocumentos = [...formData.documentos];
                updatedDocumentos[index].tipo = e.target.value as TipoDocumento;
                setFormData({ ...formData, documentos: updatedDocumentos });
              }}
            >
              <option value="CPF">CPF</option>
              <option value="RG">RG</option>
              <option value="Passaporte">Passaporte</option>
            </select>
            <FormError message={formErrors?.[`documentos.${index}.tipo`]} />
          </div>
          {/* --- Data de Expedição --- */}
          <div>
            <label
              htmlFor={`doc-data-${documento.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Data de Expedição
            </label>
            <input
              type="date"
              id={`doc-data-${documento.id}`}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
              value={
                documento.dataExpedicao
                  ? new Date(documento.dataExpedicao)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) => {
                const updatedDocumentos = [...formData.documentos];
                updatedDocumentos[index].dataExpedicao = new Date(e.target.value);
                setFormData({ ...formData, documentos: updatedDocumentos });
              }}
            />
            <FormError
              message={formErrors?.[`documentos.${index}.dataExpedicao`]}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
        onClick={handleAddDocumento}
      >
        Adicionar Documento
      </button>
    </div>

    {/* --- Endereco --- */}
    <h5 className="mt-6 mb-3 text-lg font-medium text-gray-800">Endereço</h5>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* --- Rua --- */}
      <div>
        <label
          htmlFor="rua"
          className="block text-sm font-medium text-gray-700"
        >
          Rua
        </label>
        <input
          type="text"
          id="rua"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="Rua"
          value={formData.endereco.rua}
          onChange={(e) =>
            setFormData({
              ...formData,
              endereco: { ...formData.endereco, rua: e.target.value },
            })
          }
        />
        <FormError message={formErrors?.[`endereco.rua`]} />
      </div>
      {/* --- Bairro --- */}
      <div>
        <label
          htmlFor="bairro"
          className="block text-sm font-medium text-gray-700"
        >
          Bairro
        </label>
        <input
          type="text"
          id="bairro"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="Bairro"
          value={formData.endereco.bairro}
          onChange={(e) =>
            setFormData({
              ...formData,
              endereco: { ...formData.endereco, bairro: e.target.value },
            })
          }
        />
        <FormError message={formErrors?.[`endereco.bairro`]} />
      </div>
      {/* --- Cidade --- */}
      <div>
        <label
          htmlFor="cidade"
          className="block text-sm font-medium text-gray-700"
        >
          Cidade
        </label>
        <input
          type="text"
          id="cidade"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="Cidade"
          value={formData.endereco.cidade}
          onChange={(e) =>
            setFormData({
              ...formData,
              endereco: { ...formData.endereco, cidade: e.target.value },
            })
          }
        />
        <FormError message={formErrors?.[`endereco.cidade`]} />
      </div>
      {/* --- Estado --- */}
      <div>
        <label
          htmlFor="estado"
          className="block text-sm font-medium text-gray-700"
        >
          Estado
        </label>
        <input
          type="text"
          id="estado"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="Estado"
          value={formData.endereco.estado}
          onChange={(e) =>
            setFormData({
              ...formData,
              endereco: { ...formData.endereco, estado: e.target.value },
            })
          }
        />
        <FormError message={formErrors?.[`endereco.estado`]} />
      </div>
      {/* --- País --- */}
      <div>
        <label
          htmlFor="pais"
          className="block text-sm font-medium text-gray-700"
        >
          País
        </label>
        <input
          type="text"
          id="pais"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="País"
          value={formData.endereco.pais}
          onChange={(e) =>
            setFormData({
              ...formData,
              endereco: { ...formData.endereco, pais: e.target.value },
            })
          }
        />
        <FormError message={formErrors?.[`endereco.pais`]} />
      </div>
      {/* --- CEP --- */}
      <div>
        <label
          htmlFor="cep"
          className="block text-sm font-medium text-gray-700"
        >
          CEP
        </label>
        <input
          type="text"
          id="cep"
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
          placeholder="CEP"
          value={formData.endereco.codigoPostal}
          onChange={(e) =>
            setFormData({
              ...formData,
              endereco: { ...formData.endereco, codigoPostal: e.target.value },
            })
          }
        />
        <FormError message={formErrors?.[`endereco.codigoPostal`]} />
      </div>
    </div>
  </form>
);

export default ClienteForm;