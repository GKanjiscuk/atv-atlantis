import React from 'react';
import Hospedagem from '../../interfaces/hospedagem';

interface HospedagemTableProps {
    hospedagens: Hospedagem[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const HospedagemTable: React.FC<HospedagemTableProps> = ({ hospedagens, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Clientes</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acomodação</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Check-in</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Check-out</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {hospedagens.map(hospedagem => (
                            <tr key={hospedagem.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{hospedagem.id.toString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {hospedagem.clientes.map(cliente => cliente.nome).join(", ")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{hospedagem.acomodacao.nomeAcomadacao}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{hospedagem.dataEntrada.toLocaleDateString('pt-BR')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{hospedagem.dataSaida.toLocaleDateString('pt-BR')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                                    <button
                                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
                                        onClick={() => onEdit(hospedagem.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                                        onClick={() => onDelete(hospedagem.id)}
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
                {hospedagens.map(hospedagem => (
                    <div key={hospedagem.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg text-gray-900">{hospedagem.acomodacao.nomeAcomadacao}</span>
                             <span className="text-sm text-gray-600">ID: {hospedagem.id.toString()}</span>
                        </div>
                        <div className="text-sm text-gray-700 space-y-1">
                            <div>
                                <span className="font-medium">Clientes:</span> {hospedagem.clientes.map(cliente => cliente.nome).join(", ")}
                            </div>
                            <div><span className="font-medium">Check-in:</span> {hospedagem.dataEntrada.toLocaleDateString('pt-BR')}</div>
                            <div><span className="font-medium">Check-out:</span> {hospedagem.dataSaida.toLocaleDateString('pt-BR')}</div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                            <button
                                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
                                onClick={() => onEdit(hospedagem.id)}
                            >
                                Editar
                            </button>
                            <button
                                className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                                onClick={() => onDelete(hospedagem.id)}
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

export default HospedagemTable;