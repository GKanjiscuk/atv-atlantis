// src/pages/HospedagemPage.tsx
import React from 'react';

// Importando os componentes de UI
import NavbarComponent from '../components/navbar';
import HospedagemForm from '../components/hospedagem/HospedagemForm';
import HospedagemTable from '../components/hospedagem/HospedagemTable';
import ModalWrapper from '../components/ModalWrapper';


// Importando o Hook de Lógica
import useHospedagemCRUD from '../hooks/useHospedagemCRUD';
import DeleteConfirmationModal from '../components/DeletionModalConfirmation';

const HospedagemPage: React.FC = () => {
    // Consumindo o Hook! Toda a lógica está aqui.
    const {
        hospedagens,
        hospedagemFormData,
        setHospedagemFormData,
        clientes,
        acomodacoes,
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
        ...formHandlers // Pega o resto (handleAddCliente, etc.)
    } = useHospedagemCRUD();

    return (
        <div className="min-h-screen bg-gray-100">
            <NavbarComponent />
            <div className="max-w-screen-2xl mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                    <h3 className="text-4xl font-extrabold text-gray-900 leading-tight">Hospedagens</h3>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                        onClick={handleAdd}
                    >
                        Adicionar Hospedagem
                    </button>
                </div>

                <HospedagemTable
                    hospedagens={hospedagens}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <ModalWrapper
                title="Adicionar Hospedagem"
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                footer={
                    <>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onClick={() => setShowAddModal(false)}>
                            Fechar
                        </button>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600" onClick={handleSaveAdd}>
                            Salvar
                        </button>
                    </>
                }
            >
                <HospedagemForm
                    formData={hospedagemFormData}
                    setFormData={setHospedagemFormData}
                    clientes={clientes}
                    acomodacoes={acomodacoes}
                    {...formHandlers} 
                />
            </ModalWrapper>

            <ModalWrapper
                title="Editar Hospedagem"
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                footer={
                    <>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onClick={() => setShowEditModal(false)}>
                            Fechar
                        </button>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600" onClick={handleSaveEdit}>
                             Salvar Alterações
                        </button>
                    </>
                }
            >
                <HospedagemForm
                    formData={hospedagemFormData}
                    setFormData={setHospedagemFormData}
                    clientes={clientes}
                    acomodacoes={acomodacoes}
                    {...formHandlers}
                />
            </ModalWrapper>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir esta hospedagem?"
            />
        </div>
    );
};

export default HospedagemPage;