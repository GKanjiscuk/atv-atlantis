import React from 'react';

import NavbarComponent from '../components/navbar';
import AcomodacaoForm from '../components/acomodacoes/AcomodacaoForm';
import ModalWrapper from '../components/ModalWrapper';
import AcomodacaoTable from '../components/acomodacoes/AcomodacaoTable';

import useAcomodacaoCRUD from '../hooks/useAcomodacaoCRUD';
import DeleteConfirmationModal from '../components/DeletionModalConfirmation';


const AcomodacoesPage: React.FC = () => {

    const {
        acomodacoes,
        formData,
        setFormData,
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
    } = useAcomodacaoCRUD();

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <NavbarComponent />
            <div className="max-w-screen-2xl mx-auto px-4 py-8 md:px-6 lg:px-8">
            
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                    <h3 className="text-4xl font-extrabold text-gray-900 leading-tight">Acomodações</h3>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                        onClick={handleAdd}
                    >
                        Adicionar Acomodação
                    </button>
                </div>
                
            
                <AcomodacaoTable
                    acomodacoes={acomodacoes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

        
            <ModalWrapper
                title="Adicionar Acomodação"
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
                <AcomodacaoForm formData={formData} setFormData={setFormData} />
            </ModalWrapper>

        
            <ModalWrapper
                title="Editar Acomodação"
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
                <AcomodacaoForm formData={formData} setFormData={setFormData} />
            </ModalWrapper>

        
            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir esta acomodação? Esta ação é irreversível."
            />
        </div>
    );
};

export default AcomodacoesPage;