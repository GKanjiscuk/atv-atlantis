import React from 'react';
import Acomodacao from '../../interfaces/acomodacoes';

interface AcomodacaoTableProps {
    acomodacoes: Acomodacao[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const AcomodacaoTable: React.FC<AcomodacaoTableProps> = ({ acomodacoes, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="hidden md:block overflow-x-auto"> 
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">C. Solt.</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">C. Casal</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Suítes</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Climatização</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Garagem</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {acomodacoes.map((acomodacao) => (
                            <tr key={acomodacao.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{acomodacao.id.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{acomodacao.nomeAcomadacao}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{acomodacao.camaSolteiro.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{acomodacao.camaCasal.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{acomodacao.suite.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                                    {acomodacao.climatizacao ? (
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Sim
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Não
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{acomodacao.garagem.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                                    <button
                                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors duration-150"
                                        onClick={() => onEdit(acomodacao.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors duration-150"
                                        onClick={() => onDelete(acomodacao.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            <div className="md:hidden space-y-4 p-4"> 
                {acomodacoes.map((acomodacao) => (
                    <div key={acomodacao.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-gray-900">{acomodacao.nomeAcomadacao}</span>
                            <span className="text-gray-600">ID: {acomodacao.id.toString()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <div><span className="font-medium">C. Solteiro:</span> {acomodacao.camaSolteiro.toString()}</div>
                            <div><span className="font-medium">C. Casal:</span> {acomodacao.camaCasal.toString()}</div>
                            <div><span className="font-medium">Suítes:</span> {acomodacao.suite.toString()}</div>
                            <div><span className="font-medium">Garagem:</span> {acomodacao.garagem.toString()}</div>
                            <div className="col-span-2 flex items-center">
                                <span className="font-medium mr-2">Climatização:</span>
                                {acomodacao.climatizacao ? (
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Sim
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        Não
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-3">
                            <button
                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors duration-150"
                                onClick={() => onEdit(acomodacao.id)}
                            >
                                Editar
                            </button>
                            <button
                                className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors duration-150"
                                onClick={() => onDelete(acomodacao.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcomodacaoTable;