import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavbarComponent from "../components/navbar.js";
import ClienteTable from "../components/cliente/ClienteTable.js";
import ModalWrapper from "../components/ModalWrapper.js";
import DeleteConfirmationModal from "../components/DeletionModalConfirmation.js";

import { useClienteCRUD } from "../hooks/useClienteCRUD.js";

import { fetchClienteById } from "../services/clienteService.js";
import Cliente from "../interfaces/cliente.js";
import ClienteForm from "../components/cliente/ClienteForm.js";

const DependentesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const titularId = Number(id);
  const [clienteTitular, setClienteTitular] = useState<Cliente | null>(null);

  const {
    clientes: dependentes,
    clienteFormData,
    setClienteFormData,

    isLoading,
    error,
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

  useEffect(() => {
    const getTitular = async () => {
      if (titularId) {
        try {
          const titular = await fetchClienteById(titularId);
          setClienteTitular(titular);
        } catch (err) {
          console.error("Erro ao buscar titular:", err);
        }
      }
    };
    getTitular();
  }, [titularId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-10 text-gray-500">
          Carregando dependentes...
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg">
          <strong>Erro:</strong> {error}
        </div>
      );
    }
    if (dependentes.length === 0) {
      return (
        <div className="text-center p-10 text-gray-500">
          Nenhum dependente encontrado.
        </div>
      );
    }
    return (
      <ClienteTable
        clientes={dependentes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />

      <div className="max-w-screen-2xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Dependentes de:{" "}
            {/* O '?' previne crash se o titular ainda não carregou */}
            <span className="text-blue-600">{clienteTitular?.nome}</span>
          </h3>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg"
            onClick={handleAdd}
          >
            Adicionar Dependente
          </button>
        </div>

        {/* 5. RENDERIZA O CONTEÚDO (TABELA, LOADING, ETC.) */}
        {renderContent()}
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={handleSaveAdd}
            >
              Salvar
            </button>
          </>
        }
      >
        {/* O formulário já está configurado para usar 'titularId' do hook */}
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
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
