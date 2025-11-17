import { useState, useEffect, useCallback } from "react";
import {
  fetchClientes,
  addCliente,
  editCliente,
  removeCliente,
} from "../services/clienteService.js";
import Cliente from "../interfaces/cliente.js";
import { TipoDocumento } from "../enumeradores/tipoDocumento.js";

import { ZodError, ZodIssue } from "zod";

import { clienteSchema as ZodClienteSchema } from "../../../backend/src/validation/clienteSchema.js";

function getInitialFormData(titularId: number | null): Cliente {
  return {
    id: 0,
    nome: "",
    nomeSocial: "",
    dataNascimento: new Date(new Date().toDateString()),
    dataCadastro: new Date(new Date().toDateString()),
    telefones: [{ id: 0, ddd: 0, numero: "" }],
    endereco: {
      rua: "",
      cidade: "",
      bairro: "",
      estado: "",
      pais: "",
      codigoPostal: "",
    },
    documentos: [
      {
        id: 0,
        numero: "",
        tipo: TipoDocumento.CPF,
        dataExpedicao: new Date(new Date().toDateString()),
      },
    ],

    titularId: titularId,
    dependentes: [],
  };
}

const tipoDocMap: { [key: string]: string } = {
  [String(TipoDocumento.CPF)]: "CPF",
  [String(TipoDocumento.RG)]: "RG",
  [String(TipoDocumento.Passaporte)]: "Passaporte",
};

const reverseTipoDocMap: { [key: string]: TipoDocumento } = {
  CPF: TipoDocumento.CPF,
  RG: TipoDocumento.RG,
  Passaporte: TipoDocumento.Passaporte,
};

export const useClienteCRUD = (titularId: number | null = null) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [clienteFormData, setClienteFormData] = useState<Cliente>(
    getInitialFormData(titularId)
  );
  const [formErrors, setFormErrors] = useState<any>({});
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const loadClientes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedClientes = await fetchClientes();

      const filteredClientes = fetchedClientes.filter(
        (cliente) => cliente.titularId === titularId
      );
      setClientes(filteredClientes);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [titularId]);

  useEffect(() => {
    loadClientes();
  }, [loadClientes]);

  const handleAdd = () => {
    setClienteFormData(getInitialFormData(titularId));
    setShowAddModal(true);
  };

  const handleSaveAdd = async () => {
    

    const dataToValidate = {
      ...clienteFormData,
      documentos: clienteFormData.documentos.map((doc) => ({
        ...doc,
        tipo: tipoDocMap[doc.tipo] || doc.tipo,
      })),
    };

    

    const result = ZodClienteSchema.safeParse(dataToValidate);

    
    if (!result.success) {
      console.error("--- 5.A. VALIDAÇÃO FALHOU! ---");
      const errors: any = {};
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      console.error("--- 5.B. Erros que serão setados: ---", errors);
      setFormErrors(errors);
      return;
    }

    
    try {
      const dataParaAPI = {
        ...result.data,
        id: clienteFormData.id,
        telefones: clienteFormData.telefones,
        documentos: result.data.documentos.map((doc, index) => ({
          ...doc,
          tipo: reverseTipoDocMap[doc.tipo],
          id: clienteFormData.documentos[index].id,
        })),
      };

      await addCliente(dataParaAPI);

      setShowAddModal(false);
      loadClientes();
    } catch (err) {
      console.error(
        "--- 9. ERRO NO CATCH (API FALHOU OU TRADUÇÃO REVERSA FALHOU) ---",
        err
      );
      setError((err as Error).message);
    }
  };

  const handleEdit = (id: number) => {
    const clienteToEdit = clientes.find((cliente) => cliente.id === id);
    if (clienteToEdit) {
      setClienteFormData(clienteToEdit);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async () => {
    setFormErrors({});

    const dataToValidate = {
      ...clienteFormData,
      documentos: clienteFormData.documentos.map((doc) => ({
        ...doc,
        tipo: tipoDocMap[doc.tipo] || doc.tipo,
      })),
    };

    const result = ZodClienteSchema.safeParse(dataToValidate);

    if (!result.success) {
      const errors: any = {};

      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    try {
      await editCliente(clienteFormData.id, {
        ...result.data,
        id: clienteFormData.id,
        telefones: clienteFormData.telefones,

        documentos: result.data.documentos.map((doc, index) => ({
          ...doc,

          tipo: reverseTipoDocMap[doc.tipo],
          id: clienteFormData.documentos[index].id,
        })),
      });
      setShowEditModal(false);
      loadClientes();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = (id: number) => {
    setClientToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (clientToDelete !== null) {
      try {
        await removeCliente(clientToDelete);
        setShowDeleteModal(false);
        setClientToDelete(null);
        loadClientes();
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const handleAddTelefone = () => {
    const newTelefone = { id: Date.now(), ddd: 0, numero: "" };
    setClienteFormData({
      ...clienteFormData,
      telefones: [...clienteFormData.telefones, newTelefone],
    });
  };
  const handleRemoveTelefone = (id: number) => {
    setClienteFormData({
      ...clienteFormData,
      telefones: clienteFormData.telefones.filter((t) => t.id !== id),
    });
  };
  const handleAddDocumento = () => {
    const newDocumento = {
      id: Date.now(),
      numero: "",
      tipo: TipoDocumento.CPF,
      dataExpedicao: new Date(),
    };
    setClienteFormData({
      ...clienteFormData,
      documentos: [...clienteFormData.documentos, newDocumento],
    });
  };
  const handleRemoveDocumento = (id: number) => {
    setClienteFormData({
      ...clienteFormData,
      documentos: clienteFormData.documentos.filter((d) => d.id !== id),
    });
  };

  return {
    clientes,
    clienteFormData,
    setClienteFormData,
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
    formErrors,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    handleConfirmDelete,
    handleAddTelefone,
    handleRemoveTelefone,
    handleAddDocumento,
    handleRemoveDocumento,
  };
};
