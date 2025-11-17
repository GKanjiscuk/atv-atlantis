import React from 'react';
import Cliente from '../../interfaces/cliente';
import Hospedagem from '../../interfaces/hospedagem';
import Acomodacao from '../../interfaces/acomodacoes';

interface HospedagemFormProps {
    formData: Hospedagem;
    setFormData: React.Dispatch<React.SetStateAction<Hospedagem>>;
    clientes: Cliente[];
    acomodacoes: Acomodacao[];
    handleAddClienteToHospedagem: () => void;
    handleRemoveClienteFromHospedagem: (index: number) => void;
    handleChangeCliente: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void;
}

const HospedagemForm: React.FC<HospedagemFormProps> = ({
    formData,
    setFormData,
    clientes,
    acomodacoes,
    handleAddClienteToHospedagem,
    handleRemoveClienteFromHospedagem,
    handleChangeCliente
}) => (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Clientes</label>
            <div className="space-y-3">
                {formData.clientes.map((cliente, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <select
                            className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                            value={cliente.id}
                            onChange={(e) => handleChangeCliente(e, index)}
                        >
                            <option value={-1}>Selecione um Cliente</option>
                            {clientes.map(c => (
                                <option key={c.id} value={c.id}>{c.nome}</option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
                            onClick={() => handleRemoveClienteFromHospedagem(index)}
                        >
                            Remover
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                className="mt-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                onClick={handleAddClienteToHospedagem}
            >
                Adicionar Cliente
            </button>
        </div>

        <div>
            <label htmlFor="acomodacao" className="block text-sm font-medium text-gray-700">Acomodação</label>
            <select
                id="acomodacao"
                className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                value={formData.acomodacao.id}
                onChange={(e) => {
                    const acomodacao = acomodacoes.find(a => a.id === Number(e.target.value));
                    setFormData({ ...formData, acomodacao: acomodacao! });
                }}
            >
                {acomodacoes.map(acomodacao => (
                    <option key={acomodacao.id} value={acomodacao.id}>
                        {acomodacao.nomeAcomadacao}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="dataEntrada" className="block text-sm font-medium text-gray-700">Data de Entrada</label>
                <input
                    type="date"
                    id="dataEntrada"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    value={formData.dataEntrada.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dataEntrada: new Date(e.target.value) })}
                />
            </div>
            <div>
                <label htmlFor="dataSaida" className="block text-sm font-medium text-gray-700">Data de Saída</label>
                <input
                    type="date"
                    id="dataSaida"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                    value={formData.dataSaida.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dataSaida: new Date(e.target.value) })}
                />
            </div>
        </div>
    </form>
);

export default HospedagemForm;