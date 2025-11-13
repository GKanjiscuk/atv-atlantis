// src/hooks/useClienteCRUD.ts
import { useState, useEffect } from 'react';
import { fetchClientes, addCliente, editCliente, removeCliente } from '../services/clienteService';
import Cliente from '../interfaces/cliente';
import { TipoDocumento } from '../enumeradores/tipoDocumento';

// Opcional: passe um ID de titular para filtrar (para a pág. de dependentes)
export const useClienteCRUD = (titularId: number | null = null) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [clienteFormData, setClienteFormData] = useState<Cliente>(getInitialFormData());
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  function getInitialFormData(): Cliente {
    return {
      id: 0,
      nome: '',
      nomeSocial: '',
      dataNascimento: new Date(),
      dataCadastro: new Date(),
      telefones: [{ id: 1, ddd: 11, numero: '123456789' }],
      endereco: { rua: '', cidade: '', bairro: '', estado: '', pais: '', codigoPostal: '' },
      documentos: [{ id: 1, numero: '', tipo: TipoDocumento.CPF, dataExpedicao: new Date() }],
      titular: titularId // Chave aqui!
    };
  }

  useEffect(() => {
    const fetchedClientes = fetchClientes();
    const filteredClientes = fetchedClientes.filter(cliente => cliente.titular === titularId);
    setClientes(filteredClientes);
  }, [titularId]);

  const handleAdd = () => {
    setClienteFormData(getInitialFormData());
    setShowAddModal(true);
  };

  const handleSaveAdd = () => {
    const allClientes = fetchClientes();
    const maxId = allClientes.reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newCliente: Cliente = { ...clienteFormData, id: maxId + 1 };
    
    addCliente(newCliente);
    
    // Atualiza a lista local apenas se pertencer ao filtro atual
    if (newCliente.titular === titularId) {
        setClientes([...clientes, newCliente]);
    }
    
    setShowAddModal(false);
  };

  const handleEdit = (id: number) => {
    const clienteToEdit = clientes.find(cliente => cliente.id === id);
    if (clienteToEdit) {
      setClienteFormData({
        ...clienteToEdit,
        dataNascimento: new Date(clienteToEdit.dataNascimento),
        dataCadastro: new Date(clienteToEdit.dataCadastro),
        documentos: clienteToEdit.documentos.map(doc => ({
          ...doc,
          dataExpedicao: new Date(doc.dataExpedicao)
        }))
      });
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    editCliente(clienteFormData.id, clienteFormData);
    setClientes(clientes.map(c => (c.id === clienteFormData.id ? clienteFormData : c)));
    setShowEditModal(false);
  };

  const handleDelete = (id: number) => {
    setClientToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete !== null) {
      removeCliente(clientToDelete);
      setClientes(clientes.filter(cliente => cliente.id !== clientToDelete));
      setShowDeleteModal(false);
      setClientToDelete(null);
    }
  };

  // Handlers do Formulário
  const handleAddTelefone = () => {
    const newTelefone = { id: clienteFormData.telefones.length + 1, ddd: 11, numero: '' };
    setClienteFormData({ ...clienteFormData, telefones: [...clienteFormData.telefones, newTelefone] });
  };
  const handleRemoveTelefone = (id: number) => {
    setClienteFormData({ ...clienteFormData, telefones: clienteFormData.telefones.filter(t => t.id !== id) });
  };
  const handleAddDocumento = () => {
    const newDocumento = { id: clienteFormData.documentos.length + 1, numero: '', tipo: TipoDocumento.CPF, dataExpedicao: new Date() };
    setClienteFormData({ ...clienteFormData, documentos: [...clienteFormData.documentos, newDocumento] });
  };
  const handleRemoveDocumento = (id: number) => {
    setClienteFormData({ ...clienteFormData, documentos: clienteFormData.documentos.filter(d => d.id !== id) });
  };

  // Retorna o estado e as funções que a página vai precisar
  return {
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
    handleAddTelefone,
    handleRemoveTelefone,
    handleAddDocumento,
    handleRemoveDocumento
  };
};