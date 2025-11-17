import { useState, useEffect, useCallback } from "react";
import {
  fetchHospedagens,
  addHospedagem,
  editHospedagem,
  removeHospedagem,
} from "../services/hospedagemService.js";
import { fetchClientes } from "../services/clienteService.js";
import { fetchAcomodacoes } from "../services/acomodacoesService.js";

import Hospedagem from "../interfaces/hospedagem.js";
import Cliente from "../interfaces/cliente.js";
import Acomodacao from "../interfaces/acomodacoes.js";
import { NomeAcomadacao } from "../enumeradores/tipoAcomodacao.js";

const getDefaultAcomodacao = (): Acomodacao => ({
  id: 0,
  nomeAcomadacao: NomeAcomadacao.SolteiroSimples,
  camaSolteiro: 0,
  camaCasal: 0,
  suite: 0,
  climatizacao: false,
  garagem: 0,
});

const getInitialFormData = (
  defaultAcomodacao?: Acomodacao,
  defaultCliente?: Cliente
): Hospedagem => ({
  id: 0,
  clientes: defaultCliente ? [defaultCliente] : [],
  acomodacao: defaultAcomodacao || getDefaultAcomodacao(),
  dataEntrada: new Date(new Date().toDateString()),
  dataSaida: new Date(new Date().toDateString()),
});

export const useHospedagemCRUD = () => {
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allClientes, setAllClientes] = useState<Cliente[]>([]);
  const [allAcomodacoes, setAllAcomodacoes] = useState<Acomodacao[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState<Hospedagem>(getInitialFormData());
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedHospedagens, fetchedClientes, fetchedAcomodacoes] =
        await Promise.all([
          fetchHospedagens(),
          fetchClientes(),
          fetchAcomodacoes(),
        ]);

      setHospedagens(fetchedHospedagens);
      setAllClientes(fetchedClientes.filter((c) => c.titularId === null));
      setAllAcomodacoes(fetchedAcomodacoes);

      if (fetchedAcomodacoes.length > 0) {
        setFormData(
          getInitialFormData(fetchedAcomodacoes[0], fetchedClientes[0])
        );
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAdd = () => {
    setFormData(getInitialFormData(allAcomodacoes[0], allClientes[0]));
    setShowAddModal(true);
  };

  const handleSaveAdd = async () => {
    try {
      await addHospedagem(formData);
      setShowAddModal(false);
      loadData();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEdit = (id: number) => {
    const itemToEdit = hospedagens.find((h) => h.id === id);
    if (itemToEdit) {
      setFormData(itemToEdit);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editHospedagem(formData.id, formData);
      setShowEditModal(false);
      loadData();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete !== null) {
      try {
        await removeHospedagem(itemToDelete);
        setShowDeleteModal(false);
        setItemToDelete(null);
        loadData();
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };


  const handleAddClienteToHospedagem = () => {
    if (allClientes.length === 0) return;
    setFormData((prev) => ({
      ...prev,
      clientes: [...prev.clientes, allClientes[0]],
    }));
  };
  const handleRemoveClienteFromHospedagem = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      clientes: prev.clientes.filter((_, index) => index !== indexToRemove),
    }));
  };
  const handleChangeCliente = (
    e: React.ChangeEvent<HTMLSelectElement>,
    indexToChange: number
  ) => {
    const clienteId = Number(e.target.value);
    const cliente = allClientes.find((c) => c.id === clienteId);
    if (cliente) {
      setFormData((prev) => ({
        ...prev,
        clientes: prev.clientes.map((c, index) =>
          index === indexToChange ? cliente : c
        ),
      }));
    }
  };

  return {
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
    handleAddClienteToHospedagem,
    handleRemoveClienteFromHospedagem,
    handleChangeCliente,
  };
};
