import { Cliente } from "../models/cliente.js";
import {
  clienteRepository,
  ClienteOnlyData,
} from "../repositories/clienteRepository.js";
import { enderecoRepository } from "../repositories/enderecoRepository.js";
import { telefoneRepository } from "../repositories/telefoneRepository.js";
import { documentoRepository } from "../repositories/documentoRepository.js";
import { ClienteCreationData } from "../models/dto/clienteDTO.js";

import sequelize from "../config/connection.js";

export const clienteService = {
  getAll: async (): Promise<Cliente[]> => {
    return clienteRepository.findAllWithRelations();
  },

  getById: async (id: number): Promise<Cliente> => {
    const cliente = await clienteRepository.findByIdWithRelations(id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    return cliente;
  },

  create: async (data: ClienteCreationData): Promise<Cliente> => {
    const transaction = await sequelize.transaction();

    try {
      const clienteData: ClienteOnlyData = {
        nome: data.nome,
        nomeSocial: data.nomeSocial,
        dataNascimento: data.dataNascimento,
        dataCadastro: data.dataCadastro,
        titularId: data.titularId,
      };

      const novoCliente = await clienteRepository.create(
        clienteData,
        transaction
      );

      const enderecoData = { ...data.endereco, clienteId: novoCliente.id };
      await enderecoRepository.create(enderecoData, transaction);

      for (const tel of data.telefones) {
        const telData = { ...tel, clienteId: novoCliente.id };
        await telefoneRepository.create(telData, transaction);
      }

      for (const doc of data.documentos) {
        const docData = { ...doc, clienteId: novoCliente.id };
        await documentoRepository.create(docData, transaction);
      }

      await transaction.commit();

      return clienteService.getById(novoCliente.id);
    } catch (error) {
      await transaction.rollback();
      const err = error as Error;
      throw new Error(`Erro ao criar cliente: ${err.message}`);
    }
  },

  update: async (
    id: number,
    data: Partial<ClienteOnlyData>
  ): Promise<Cliente> => {
    const cliente = await clienteRepository.update(id, data);
    if (!cliente) {
      throw new Error("Cliente não encontrado para atualização");
    }
    return cliente;
  },

  delete: async (id: number): Promise<void> => {
    const deleted = await clienteRepository.delete(id);
    if (deleted === 0) {
      throw new Error("Cliente não encontrado para exclusão");
    }
  },
};
