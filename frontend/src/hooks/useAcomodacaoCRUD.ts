import { useState, useEffect } from "react";

import {
  fetchAcomodacoes,
  addAcomodacao,
  editAcomodacao,
  removeAcomodacao,
} from "../services/acomodacoesService";
import Acomodacao from "../interfaces/acomodacoes";
import { NomeAcomadacao } from "../enumeradores/tipoAcomodacao";

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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState<Acomodacao>(getInitialFormData());
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const loadAcomodacoes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedAcomodacoes = await fetchAcomodacoes();
      setAcomodacoes(fetchedAcomodacoes);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAcomodacoes();
  }, []);

  const handleAdd = () => {
    setFormData(getInitialFormData());
    setShowAddModal(true);
  };

  const handleSaveAdd = async () => {
    try {
      await addAcomodacao(formData.nomeAcomadacao);
      setShowAddModal(false);
      loadAcomodacoes();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEdit = (id: number) => {
    const itemToEdit = acomodacoes.find((a) => a.id === id);
    if (itemToEdit) {
      setFormData(itemToEdit);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editAcomodacao(formData);
      setShowEditModal(false);
      loadAcomodacoes();
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
        await removeAcomodacao(itemToDelete);
        setShowDeleteModal(false);
        setItemToDelete(null);
        loadAcomodacoes();
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return {
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
  };
};

export default useAcomodacaoCRUD;
