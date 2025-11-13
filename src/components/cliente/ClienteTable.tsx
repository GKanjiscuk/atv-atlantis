// src/components/ClienteTable.tsx
import React from 'react';
import Cliente from '../../interfaces/cliente';
import { useNavigate } from 'react-router-dom';

interface ClienteTableProps {
  clientes: Cliente[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  // A função de ver dependentes é opcional (só existe na página de titulares)
  onViewDependentes?: (id: number) => void;
}

const ClienteTable: React.FC<ClienteTableProps> = ({ clientes, onEdit, onDelete, onViewDependentes }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Tabela para telas maiores (md:block) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nome Social</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Data de Nasc.</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {clientes.map(cliente => (
              <tr key={cliente.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.id.toString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.nomeSocial}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.dataNascimento.toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                  <button
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
                    onClick={() => onEdit(cliente.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                    onClick={() => onDelete(cliente.id)}
                  >
                    Excluir
                  </button>
                  {onViewDependentes && (
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                      onClick={() => onViewDependentes(cliente.id)}
                    >
                      Dependentes
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards empilhados para telas pequenas (md:hidden) */}
      <div className="md:hidden space-y-4 p-4">
        {clientes.map(cliente => (
          <div key={cliente.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-gray-900">{cliente.nome}</span>
              <span className="text-sm text-gray-600">ID: {cliente.id.toString()}</span>
            </div>
            <div className="text-sm text-gray-700">
              <div><span className="font-medium">Nome Social:</span> {cliente.nomeSocial}</div>
              <div><span className="font-medium">Nascimento:</span> {cliente.dataNascimento.toLocaleDateString('pt-BR')}</div>
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
                onClick={() => onEdit(cliente.id)}
              >
                Editar
              </button>
              <button
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                onClick={() => onDelete(cliente.id)}
              >
                Excluir
              </button>
              {onViewDependentes && (
                <button
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                  onClick={() => onViewDependentes(cliente.id)}
                >
                  Dependentes
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClienteTable;