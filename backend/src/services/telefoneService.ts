import { Telefone } from "../models/telefone.js";
import { telefoneRepository, TelefoneCreationData } from "../repositories/telefoneRepository.js";

export const telefoneService = {

    getAll: async (): Promise<Telefone[]> => {
        return telefoneRepository.findAll();
    },

    getById: async (id: number): Promise<Telefone> => {
        const telefone = await telefoneRepository.findById(id);
        if (!telefone) {
            throw new Error('Telefone não encontrado');
        }
        return telefone;
    },

    create: async (data: TelefoneCreationData): Promise<Telefone> => {
        
        return telefoneRepository.create(data);
    },

    update: async (id: number, data: Partial<TelefoneCreationData>): Promise<Telefone> => {
        const telefone = await telefoneRepository.update(id, data);
        if (!telefone) {
            throw new Error('Telefone não encontrado para atualização');
        }
        return telefone;
    },

    delete: async (id: number): Promise<void> => {
        const deleted = await telefoneRepository.delete(id);
        if (deleted === 0) {
            throw new Error('Telefone não encontrado para exclusão');
        }
    }
};