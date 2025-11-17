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
    } = useAcomodacaoCRUD(); 

    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-10 text-gray-500">
                    Carregando acomodações...
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

        if (acomodacoes.length === 0) {
             return (
                <div className="text-center p-10 text-gray-500">
                    Nenhuma acomodação encontrada.
                </div>
            );
        }

        return (
            <AcomodacaoTable
                acomodacoes={acomodacoes}
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
                    <h3 className="text-4xl font-extrabold text-gray-900 leading-tight">Acomodações</h3>
                    <button
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                        onClick={handleAdd}
                    >
                        Adicionar Acomodação
                    </button>
                </div>
                
                {/* ATUALIZAÇÃO: Renderiza o conteúdo (tabela, loading ou erro) */}
                {renderContent()}
            </div>

        
            {/* Modal de Adicionar */}
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
                <AcomodacaoForm formData={formData} setFormData={setFormData} isAdding={true} />
            </ModalWrapper>

        
            {/* Modal de Editar */}
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
                {/* NOTA: O AcomodacaoForm (Turno 26) tem um <select> para o 'tipo'.
                  Quando você clica em 'Salvar' no modo Adicionar, usamos o 'tipo' para o Builder.
                  Quando você clica em 'Salvar' no modo Editar, o service (front-end) envia o
                  objeto *inteiro* para o 'PUT' do back-end, que também funciona.
                */}
                <AcomodacaoForm formData={formData} setFormData={setFormData} />
            </ModalWrapper>

        
            {/* Modal de Deletar */}
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