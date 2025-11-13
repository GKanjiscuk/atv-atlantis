
import { useState, useEffect } from 'react';
import { fetchClientes } from '../services/clienteService';
import { fetchHospedagens, addHospedagem, editHospedagem, removeHospedagem } from '../services/hospedagemService';
import { fetchAcomodacoes } from '../services/acomodacoesService';
import Cliente from '../interfaces/cliente';
import Hospedagem from '../interfaces/hospedagem';
import Acomodacao from '../interfaces/acomodacoes';

const useHospedagemCRUD = () => {
    const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);
    
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const [hospedagemFormData, setHospedagemFormData] = useState<Hospedagem>(getInitialFormData());
    const [hospedagemToDelete, setHospedagemToDelete] = useState<number | null>(null);

    function getInitialFormData(): Hospedagem {
        return {
            id: 0,
            clientes: [],
            acomodacao: acomodacoes.length > 0 ? acomodacoes[0] : {} as Acomodacao,
            dataEntrada: new Date(),
            dataSaida: new Date(),
        };
    }

    useEffect(() => {
        const fetchedClientes = fetchClientes();
        setClientes(fetchedClientes);

        const fetchedAcomodacoes = fetchAcomodacoes();
        setAcomodacoes(fetchedAcomodacoes);

        if (fetchedAcomodacoes.length > 0) {
            setHospedagemFormData((prevState) => ({
                ...prevState,
                acomodacao: fetchedAcomodacoes[0],
            }));
        }

        const fetchedHospedagens = fetchHospedagens();
        setHospedagens(fetchedHospedagens);
    }, []);

    const resetFormData = () => {
        setHospedagemFormData(getInitialFormData());
    };

    const handleAdd = () => {
        resetFormData();
        setShowAddModal(true);
    };

    const handleSaveAdd = () => {
        const allHospedagens = fetchHospedagens();
        const maxId = allHospedagens.reduce((max, h) => (h.id > max ? h.id : max), 0);
        const newHospedagem: Hospedagem = { ...hospedagemFormData, id: maxId + 1 };
        
        addHospedagem(newHospedagem);
        setHospedagens([...hospedagens, newHospedagem]);
        setShowAddModal(false);
    };

    const handleEdit = (id: number) => {
        const hospedagemToEdit = hospedagens.find(h => h.id === id);
        if (hospedagemToEdit) {
            setHospedagemFormData(hospedagemToEdit);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = () => {
        editHospedagem(hospedagemFormData.id, hospedagemFormData);
        setHospedagens(hospedagens.map(h => (h.id === hospedagemFormData.id ? hospedagemFormData : h)));
        setShowEditModal(false);
    };

    const handleDelete = (id: number) => {
        setHospedagemToDelete(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (hospedagemToDelete !== null) {
            removeHospedagem(hospedagemToDelete);
            setHospedagens(hospedagens.filter(h => h.id !== hospedagemToDelete));
            setShowDeleteModal(false);
            setHospedagemToDelete(null);
        }
    };

    const handleAddClienteToHospedagem = () => {
        setHospedagemFormData(prevState => ({
            ...prevState,
            clientes: [
                ...prevState.clientes,
                { id: -1, nome: '', nomeSocial: '', dataNascimento: new Date(), dataCadastro: new Date(), telefones: [], endereco: { rua: '', cidade: '', bairro: '', estado: '', pais: '', codigoPostal: '' }, documentos: [], titular: null } 
            ],
        }));
    };

    const handleRemoveClienteFromHospedagem = (index: number) => {
        const updatedClientes = [...hospedagemFormData.clientes];
        updatedClientes.splice(index, 1);
        setHospedagemFormData({ ...hospedagemFormData, clientes: updatedClientes });
    };

    const handleChangeCliente = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const selectedClientId = Number(e.target.value);
        const selectedCliente = clientes.find(cliente => cliente.id === selectedClientId);
        if (selectedCliente) {
            const updatedClientes = [...hospedagemFormData.clientes];
            updatedClientes[index] = selectedCliente;
            setHospedagemFormData({ ...hospedagemFormData, clientes: updatedClientes });
        }
    };

    return {
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
        handleAddClienteToHospedagem,
        handleRemoveClienteFromHospedagem,
        handleChangeCliente
    };
};

export default useHospedagemCRUD;