import { Endereco } from "../models/endereco.js";
import { Transaction } from "sequelize";

export interface EnderecoCreationData {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoPostal: string;
  clienteId: number;
}

export const enderecoRepository = {
  findAll: async (): Promise<Endereco[]> => {
    return Endereco.findAll();
  },

  findById: async (id: number): Promise<Endereco | null> => {
    return Endereco.findOne({
      where: { id: id },
    });
  },

  create: async (
    data: EnderecoCreationData,
    transaction?: Transaction
  ): Promise<Endereco> => {
    return Endereco.create(
      {
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        pais: data.pais,
        codigoPostal: data.codigoPostal,
        clienteId: data.clienteId,
      },
      { transaction }
    );
  },

  update: async (
    id: number,
    data: Partial<EnderecoCreationData>
  ): Promise<Endereco | null> => {
    const [updatedRows] = await Endereco.update(data, {
      where: { id: id },
    });

    if (updatedRows > 0) {
      return Endereco.findOne({ where: { id: id } });
    }
    return null;
  },

  delete: async (id: number): Promise<number> => {
    return Endereco.destroy({
      where: { id: id },
    });
  },
};
