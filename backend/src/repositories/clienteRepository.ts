import { Cliente } from "../models/cliente.js";
import { Documento } from "../models/documento.js";
import { Endereco } from "../models/endereco.js";
import { Telefone } from "../models/telefone.js";
import { Transaction } from "sequelize";
import { ClienteCreationData } from "../models/dto/clienteDTO.js";

export type ClienteOnlyData = Omit<
  ClienteCreationData,
  "telefones" | "documentos" | "endereco"
>;

export const clienteRepository = {
  findAllWithRelations: async (): Promise<Cliente[]> => {
    return Cliente.findAll({
      include: [Telefone, Documento, Endereco, "dependentes"],
    });
  },

  findByIdWithRelations: async (id: number): Promise<Cliente | null> => {
    return Cliente.findOne({
      where: { id: id },
      include: [Telefone, Documento, Endereco, "dependentes"],
    });
  },

  create: async (
    data: ClienteOnlyData,
    transaction: Transaction
  ): Promise<Cliente> => {
    return Cliente.create(data, { transaction });
  },

  update: async (
    id: number,
    data: Partial<ClienteOnlyData>
  ): Promise<Cliente | null> => {
    const [updatedRows] = await Cliente.update(data, {
      where: { id: id },
    });

    if (updatedRows > 0) {
      return Cliente.findOne({ where: { id: id } });
    }
    return null;
  },

  delete: async (id: number): Promise<number> => {
    return Cliente.destroy({
      where: { id: id },
    });
  },
};
