import { Hospedagem } from "../models/hospedagem.js";
import { Cliente } from "../models/cliente.js";
import { Acomodacao } from "../models/acomodacoes.js";
import { Transaction } from "sequelize";
export interface HospedagemBaseData {
  acomodacaoId: number;
  dataEntrada: Date;
  dataSaida: Date;
}

export const hospedagemRepository = {
  findAllWithRelations: async (): Promise<Hospedagem[]> => {
    return Hospedagem.findAll({
      include: [{ model: Cliente, through: { attributes: [] } }, Acomodacao],
    });
  },

  findByIdWithRelations: async (id: number): Promise<Hospedagem | null> => {
    return Hospedagem.findOne({
      where: { id: id },
      include: [{ model: Cliente, through: { attributes: [] } }, Acomodacao],
    });
  },

  create: async (
    data: HospedagemBaseData,
    transaction: Transaction
  ): Promise<Hospedagem> => {
    return Hospedagem.create(
      {
        acomodacaoId: data.acomodacaoId,
        dataEntrada: data.dataEntrada,
        dataSaida: data.dataSaida,
      },
      { transaction }
    );
  },

  update: async (
    id: number,
    data: HospedagemBaseData,
    transaction: Transaction
  ): Promise<Hospedagem | null> => {
    const [updatedRows] = await Hospedagem.update(data, {
      where: { id: id },
      transaction,
    });

    if (updatedRows > 0) {
      return Hospedagem.findByPk(id, { transaction });
    }
    return null;
  },

  delete: async (id: number): Promise<number> => {
    return Hospedagem.destroy({
      where: { id: id },
    });
  },
};
