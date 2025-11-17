import { Documento } from "../models/documento.js";
import { Transaction } from 'sequelize';

export interface DocumentoCreationData {
    numero: string;
    tipo: string;
    dataExpedicao: Date;
    clienteId: number;
}

export const documentoRepository = {

    findAll: async (): Promise<Documento[]> => {
        return Documento.findAll();
    },

    findById: async (id: number): Promise<Documento | null> => {
        return Documento.findOne({
            where: { id: id }
        });
    },


    create: async (data: DocumentoCreationData, transaction?: Transaction): Promise<Documento> => {
        return Documento.create({
            numero: data.numero,
            tipo: data.tipo,
            dataExpedicao: data.dataExpedicao,
            clienteId: data.clienteId
        }, { transaction });
    },

    update: async (id: number, data: Partial<DocumentoCreationData>): Promise<Documento | null> => {
        const [updatedRows] = await Documento.update(data, {
            where: { id: id }
        });

        if (updatedRows > 0) {
            return Documento.findOne({ where: { id: id } });
        }
        return null;
    },

    delete: async (id: number): Promise<number> => {
        return Documento.destroy({
            where: { id: id }
        });
    }
};