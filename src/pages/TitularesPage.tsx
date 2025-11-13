import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/navbar";

import ClienteTable from "../components/cliente/ClienteTable";
import ModalWrapper from "../components/ModalWrapper";
import DeleteConfirmationModal from "../components/DeletionModalConfirmation";
import { useClienteCRUD } from "../hooks/useClienteCRUD";
import ClienteForm from "../components/cliente/ClienteForm";

const TitularesPage: React.FC = () => {
  const navigate = useNavigate();
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
  } = useClienteCRUD(null);

  const handleViewDependentes = (id: number) => {
    navigate(`/dependentes/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />
      <div className="max-w-screen-2xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <h3 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Clientes Titulares
          </h3>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={handleAdd}
          >
            Adicionar Cliente
          </button>
        </div>

        <ClienteTable
          clientes={clientes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDependentes={handleViewDependentes}
        />
      </div>

      <ModalWrapper
        title="Adicionar Novo Cliente"
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

      <ModalWrapper
        title="Editar Cliente"
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

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

export default TitularesPage;
