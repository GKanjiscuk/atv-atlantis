import { Hospedagem } from "../models/hospedagem.js";
import {
  hospedagemRepository,
  HospedagemBaseData,
} from "../repositories/hospedagemRepository.js";
import { HospedagemCreationData } from "../models/dto/hospedagemDTO.js";

import sequelize from "../config/connection.js";

export const hospedagemService = {
  getAll: async (): Promise<Hospedagem[]> => {
    return hospedagemRepository.findAllWithRelations();
  },

  getById: async (id: number): Promise<Hospedagem> => {
    const hospedagem = await hospedagemRepository.findByIdWithRelations(id);
    if (!hospedagem) {
      throw new Error("Hospedagem não encontrada");
    }
    return hospedagem;
  },


  create: async (data: HospedagemCreationData): Promise<Hospedagem> => {
    const transaction = await sequelize.transaction();
    try {
      const baseData: HospedagemBaseData = {
        acomodacaoId: data.acomodacaoId,
        dataEntrada: data.dataEntrada,
        dataSaida: data.dataSaida,
      };

      const novaHospedagem = await hospedagemRepository.create(
        baseData,
        transaction
      );

      if (data.clienteIds && data.clienteIds.length > 0) {
        await novaHospedagem.$set("clientes", data.clienteIds, { transaction });
      }

      await transaction.commit();

      return hospedagemService.getById(novaHospedagem.id);
    } catch (error) {
      await transaction.rollback();
      const err = error as Error;
      throw new Error(`Erro ao criar hospedagem: ${err.message}`);
    }
  },

  update: async (
    id: number,
    data: HospedagemCreationData
  ): Promise<Hospedagem> => {
    const transaction = await sequelize.transaction();
    try {
      const baseData: HospedagemBaseData = {
        acomodacaoId: data.acomodacaoId,
        dataEntrada: data.dataEntrada,
        dataSaida: data.dataSaida,
      };

      const hospedagem = await hospedagemRepository.update(
        id,
        baseData,
        transaction
      );
      if (!hospedagem) {
        throw new Error("Hospedagem não encontrada para atualização");
      }

      if (Array.isArray(data.clienteIds)) {
        await hospedagem.$set("clientes", data.clienteIds, { transaction });
      }

      await transaction.commit();

      return hospedagemService.getById(id);
    } catch (error) {
      await transaction.rollback();
      const err = error as Error;
      throw new Error(`Erro ao atualizar hospedagem: ${err.message}`);
    }
  },

  delete: async (id: number): Promise<void> => {
    const deleted = await hospedagemRepository.delete(id);
    if (deleted === 0) {
      throw new Error("Hospedagem não encontrada para exclusão");
    }
  },
};
