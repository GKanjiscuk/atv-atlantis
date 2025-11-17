import React from 'react';

import NavbarComponent from '../components/navbar.js';
import ModalWrapper from '../components/ModalWrapper.js';
import DeleteConfirmationModal from '../components/DeletionModalConfirmation.js';
import HospedagemTable from '../components/hospedagem/HospedagemTable.js';
import HospedagemForm from '../components/hospedagem/HospedagemForm.js';
import { useHospedagemCRUD } from '../hooks/useHospedagemCRUD.js';

const HospedagemPage: React.FC = () => {

    const {
        hospedagens,
        formData,
        setFormData,
        isLoading,
        error,
        allClientes, 
        allAcomodacoes, 
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
    } = useHospedagemCRUD();

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10 text-gray-500">Carregando dados...</div>;
        }
        if (error) {
            return <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg"><strong>Erro:</strong> {error}</div>;
        }
        if (hospedagens.length === 0) {
            return <div className="text-center p-10 text-gray-500">Nenhuma hospedagem encontrada.</div>;
        }
        return (
            <HospedagemTable
                hospedagens={hospedagens}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <NavbarComponent />
            <div className="max-w-screen-2xl mx-auto px-4 py-8 md:px-6 lg:px-8">
            
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                    <h3 className="text-4xl font-extrabold text-gray-900 leading-tight">Hospedagens</h3>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                        onClick={handleAdd}
                    >
                        Registrar Hospedagem
                    </button>
                </div>
                
                {renderContent()}

            </div>

            {/* Modal de Adicionar */}
            <ModalWrapper
                title="Registrar Hospedagem"
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                footer={
                    <>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onClick={() => setShowAddModal(false)}>
                            Fechar
                        </button>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700" onClick={handleSaveAdd}>
                            Salvar
                        </button>
                    </>
                }
            >
                <HospedagemForm 
                    formData={formData} 
                    setFormData={setFormData}
                    clientes={allClientes}
                    acomodacoes={allAcomodacoes}
                    {...formHandlers}
                />
            </ModalWrapper>

            {/* Modal de Editar */}
            <ModalWrapper
                title="Editar Hospedagem"
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                footer={
                    <>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onClick={() => setShowEditModal(false)}>
                            Fechar
                        </button>
                        <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700" onClick={handleSaveEdit}>
                             Salvar Alterações
                        </button>
                    </>
                }
            >
                <HospedagemForm 
                    formData={formData} 
                    setFormData={setFormData}
                    clientes={allClientes}
                    acomodacoes={allAcomodacoes}
                    {...formHandlers}
                />
            </ModalWrapper>

            {/* Modal de Deletar */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir esta hospedagem? Esta ação é irreversível."
            />
        </div>
    );
};

export default HospedagemPage;