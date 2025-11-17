import { Documento } from "../models/documento.js";
import { documentoRepository, DocumentoCreationData } from "../repositories/documentoRepository.js";

export const documentoService = {

    getAll: async (): Promise<Documento[]> => {
        return documentoRepository.findAll();
    },

    getById: async (id: number): Promise<Documento> => {
        const documento = await documentoRepository.findById(id);
        if (!documento) {
            throw new Error('Documento não encontrado');
        }
        return documento;
    },

    create: async (data: DocumentoCreationData): Promise<Documento> => {
        
        return documentoRepository.create(data);
    },

    update: async (id: number, data: Partial<DocumentoCreationData>): Promise<Documento> => {
        const documento = await documentoRepository.update(id, data);
        if (!documento) {
            throw new Error('Documento não encontrado para atualização');
        }
        return documento;
    },

    delete: async (id: number): Promise<void> => {
        const deleted = await documentoRepository.delete(id);
        if (deleted === 0) {
            throw new Error('Documento não encontrado para exclusão');
        }
    }
};