
import { useState, useEffect } from 'react';
import { fetchAcomodacoes, addAcomodacao, editAcomodacao, removeAcomodacao } from '../services/acomodacoesService';
import Acomodacao from '../interfaces/acomodacoes';
import { NomeAcomadacao } from '../enumeradores/tipoAcomidacao';

const getInitialFormData = (): Acomodacao => ({
    id: 0,
    nomeAcomadacao: NomeAcomadacao.SolteiroSimples,
    camaSolteiro: 0,
    camaCasal: 0,
    suite: 0,
    climatizacao: false,
    garagem: 0,
});

const useAcomodacaoCRUD = () => {

    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
    

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    

    const [formData, setFormData] = useState<Acomodacao>(getInitialFormData());
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);


    useEffect(() => {
        const fetchedAcomodacoes = fetchAcomodacoes();
        setAcomodacoes(fetchedAcomodacoes);
    }, []);


    const handleAdd = () => {
        setFormData(getInitialFormData());
        setShowAddModal(true);
    };

    const handleSaveAdd = () => {
        addAcomodacao(formData);
        setAcomodacoes(fetchAcomodacoes());
        setShowAddModal(false);
    };

    const handleEdit = (id: number) => {
        const itemToEdit = acomodacoes.find(a => a.id === id);
        if (itemToEdit) {
            setFormData(itemToEdit);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = () => {
        editAcomodacao(formData);
        setAcomodacoes(fetchAcomodacoes());
        setShowEditModal(false);
    };

    const handleDelete = (id: number) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete !== null) {
            removeAcomodacao(itemToDelete);
            setAcomodacoes(fetchAcomodacoes());
            setShowDeleteModal(false);
            setItemToDelete(null);
        }
    };


    return {
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
    };
};

export default useAcomodacaoCRUD;