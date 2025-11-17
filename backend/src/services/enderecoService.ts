import { Endereco } from "../models/endereco.js";
import { enderecoRepository, EnderecoCreationData } from "../repositories/enderecoRepository.js";

export const enderecoService = {

    getAll: async (): Promise<Endereco[]> => {
        return enderecoRepository.findAll();
    },

    getById: async (id: number): Promise<Endereco> => {
        const endereco = await enderecoRepository.findById(id);
        if (!endereco) {
            throw new Error('Endereço não encontrado');
        }
        return endereco;
    },

    create: async (data: EnderecoCreationData): Promise<Endereco> => {
        return enderecoRepository.create(data);
    },

    update: async (id: number, data: Partial<EnderecoCreationData>): Promise<Endereco> => {
        const endereco = await enderecoRepository.update(id, data);
        if (!endereco) {
            throw new Error('Endereço não encontrado para atualização');
        }
        return endereco;
    },

    delete: async (id: number): Promise<void> => {
        const deleted = await enderecoRepository.delete(id);
        if (deleted === 0) {
            throw new Error('Endereço não encontrado para exclusão');
        }
    }
};