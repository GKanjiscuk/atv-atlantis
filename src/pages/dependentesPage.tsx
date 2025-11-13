// src/pages/dependentesPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavbarComponent from "../components/navbar";

import ClienteTable from "../components/cliente/ClienteTable";
import ModalWrapper from "../components/ModalWrapper";
import DeleteConfirmationModal from "../components/DeletionModalConfirmation";

import { useClienteCRUD } from "../hooks/useClienteCRUD";
import { fetchClientes } from "../services/clienteService"; // Apenas para buscar o nome do titular
import Cliente from "../interfaces/cliente";
import ClienteForm from "../components/cliente/ClienteForm";

const DependentesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const titularId = Number(id);
  const [clienteTitular, setClienteTitular] = useState<Cliente | null>(null);

  // O Hook cuida de TODA a lógica!
  // Passamos o 'titularId' para filtrar pelos dependentes.
  const {
    clientes,
    clienteFormData,
    setClienteFormData,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    handleAdd,
    handleSaveAdd,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    handleConfirmDelete,
    ...formHandlers
  } = useClienteCRUD(titularId);

  // Efeito só para buscar o nome do titular para o título da página
  useEffect(() => {
    const titular = fetchClientes().find((cliente) => cliente.id === titularId);
    if (titular) {
      setClienteTitular(titular);
    }
  }, [titularId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />

      <div className="max-w-screen-2xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Dependentes de:{" "}
            <span className="text-brand-500">{clienteTitular?.nome}</span>
          </h3>
          <button
            className="px-4 py-2 bg-brand-500 text-white rounded-lg shadow-md hover:bg-brand-600 focus:outline-none"
            onClick={handleAdd}
          >
            Adicionar Dependente
          </button>
        </div>

        {/* Tabela de Clientes (sem o botão de dependentes) */}
        <ClienteTable
          clientes={clientes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal de Adicionar Dependente */}
      <ModalWrapper
        title="Adicionar Novo Dependente"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        footer={
          <>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => setShowAddModal(false)}
            >
              Fechar
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600"
              onClick={handleSaveAdd}
            >
              Salvar
            </button>
          </>
        }
      >
        <ClienteForm
          formData={clienteFormData}
          setFormData={setClienteFormData}
          {...formHandlers}
        />
      </ModalWrapper>

      {/* Modal de Editar Dependente */}
      <ModalWrapper
        title="Editar Dependente"
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        footer={
          <>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => setShowEditModal(false)}
            >
              Fechar
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600"
              onClick={handleSaveEdit}
            >
              Salvar Alterações
            </button>
          </>
        }
      >
        <ClienteForm
          formData={clienteFormData}
          setFormData={setClienteFormData}
          {...formHandlers}
        />
      </ModalWrapper>

      {/* Modal de Excluir Dependente */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este dependente?"
      />
    </div>
  );
};

export default DependentesPage;
