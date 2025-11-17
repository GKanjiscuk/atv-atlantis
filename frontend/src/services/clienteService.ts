import Cliente from "../interfaces/cliente.js";

const API_URL = 'http://localhost:5000/cliente';

/**
 * Converte as strings de data recebidas da API em objetos Date.
 * Esta função agora é "null-safe".
 */
const parseClienteDates = (cliente: Cliente): Cliente => {
    return {
        ...cliente,
        // Garante que a data só seja convertida se existir
        dataNascimento: new Date(cliente.dataNascimento),
        dataCadastro: new Date(cliente.dataCadastro),
        
        // CORREÇÃO AQUI:
        // Se cliente.documentos for null/undefined, usa [].
        // Isso previne o erro .map() de 'null'.
        documentos: (cliente.documentos || []).map(doc => ({
            ...doc,
            dataExpedicao: new Date(doc.dataExpedicao)
        })),

        // Adiciona a mesma segurança para telefones e endereço
        telefones: cliente.telefones || [],
        endereco: cliente.endereco || { rua: '', bairro: '', cidade: '', estado: '', pais: '', codigoPostal: '' }
    };
};


export const fetchClientes = async (): Promise<Cliente[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Falha ao buscar clientes');
    }
    const clientesData: Cliente[] = await response.json();
    return clientesData.map(parseClienteDates);
};

export const fetchClienteById = async (id: number): Promise<Cliente> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Falha ao buscar cliente');
    }
    const clienteData: Cliente = await response.json();
    return parseClienteDates(clienteData);
};

export const addCliente = async (newCliente: Cliente): Promise<Cliente> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCliente)
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.details || 'Falha ao criar cliente');
    }
    
    const createdCliente: Cliente = await response.json();
    // Esta chamada agora é segura
    return parseClienteDates(createdCliente);
};


export const editCliente = async (id: number, updatedCliente: Cliente): Promise<Cliente> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCliente)
    });

    if (!response.ok) {
        throw new Error('Falha ao editar cliente');
    }
    
    const editedCliente: Cliente = await response.json();
    return parseClienteDates(editedCliente);
};

export const removeCliente = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Falha ao deletar cliente');
    }
};