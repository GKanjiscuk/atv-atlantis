import Hospedagem from "../interfaces/hospedagem.js";

interface HospedagemCreationData {
    acomodacaoId: number;
    dataEntrada: Date;
    dataSaida: Date;
    clienteIds: number[]; 
}

const API_URL = 'http://localhost:5000/hospedagem';


const parseHospedagemDates = (hospedagem: Hospedagem): Hospedagem => {
    return {
        ...hospedagem,
        dataEntrada: new Date(hospedagem.dataEntrada),
        dataSaida: new Date(hospedagem.dataSaida),
    };
};


export const fetchHospedagens = async (): Promise<Hospedagem[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Falha ao buscar hospedagens');
    }
    const data: Hospedagem[] = await response.json();
    return data.map(parseHospedagemDates);
};


export const addHospedagem = async (newHospedagem: Hospedagem): Promise<Hospedagem> => {
    
    const payload: HospedagemCreationData = {
        acomodacaoId: newHospedagem.acomodacao.id,
        dataEntrada: newHospedagem.dataEntrada,
        dataSaida: newHospedagem.dataSaida,
        clienteIds: newHospedagem.clientes.map(cliente => cliente.id) 
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Falha ao criar hospedagem');
    }
    
    const createdHospedagem: Hospedagem = await response.json();
    return parseHospedagemDates(createdHospedagem);
};


export const editHospedagem = async (id: number, updatedHospedagem: Hospedagem): Promise<Hospedagem> => {
    
    const payload: HospedagemCreationData = {
        acomodacaoId: updatedHospedagem.acomodacao.id,
        dataEntrada: updatedHospedagem.dataEntrada,
        dataSaida: updatedHospedagem.dataSaida,
        clienteIds: updatedHospedagem.clientes.map(cliente => cliente.id)
    };
    
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Falha ao editar hospedagem');
    }
    
    const editedHospedagem: Hospedagem = await response.json();
    return parseHospedagemDates(editedHospedagem);
};


export const removeHospedagem = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Falha ao deletar hospedagem');
    }
};