import { Telefone } from "../models/telefone.js";
import { Transaction } from 'sequelize';

export interface TelefoneCreationData {
    ddd: number;
    numero: string;
    clienteId: number;
}

export const telefoneRepository = {

    
    findAll: async (): Promise<Telefone[]> => {
        return Telefone.findAll();
    },

    
    findById: async (id: number): Promise<Telefone | null> => {
        return Telefone.findOne({
            where: { id: id }
        });
    },

    
    create: async (data: TelefoneCreationData, transaction?: Transaction): Promise<Telefone> => {
        return Telefone.create({
            ddd: data.ddd,
            numero: data.numero,
            clienteId: data.clienteId
        }, { transaction });
    },

    update: async (id: number, data: Partial<TelefoneCreationData>): Promise<Telefone | null> => {
        const [updatedRows] = await Telefone.update(data, {
            where: { id: id }
        });

        if (updatedRows > 0) {
            return Telefone.findOne({ where: { id: id } });
        }
        return null;
    },

    delete: async (id: number): Promise<number> => {
        return Telefone.destroy({
            where: { id: id }
        });
    }
};