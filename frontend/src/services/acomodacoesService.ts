import Acomodacao from "../interfaces/acomodacoes";
import { NomeAcomadacao } from "../enumeradores/tipoAcomodacao";

const API_URL = "http://localhost:5000/acomodacoes";

export const fetchAcomodacoes = async (): Promise<Acomodacao[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Falha ao buscar acomodações");
  }
  return response.json();
};

export const addAcomodacao = async (
  tipo: NomeAcomadacao
): Promise<Acomodacao> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tipo: tipo }),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar acomodação");
  }
  return response.json();
};

export const removeAcomodacao = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Falha ao deletar acomodação");
  }
};

export const editAcomodacao = async (
  updatedAcomodacao: Acomodacao
): Promise<Acomodacao> => {
  const response = await fetch(`${API_URL}/${updatedAcomodacao.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedAcomodacao),
  });

  if (!response.ok) {
    throw new Error("Falha ao editar acomodação");
  }
  return response.json();
};
