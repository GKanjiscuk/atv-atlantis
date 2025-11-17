import { Request, Response } from "express";
import { enderecoService } from "../services/enderecoService.js";
import { EnderecoCreationData } from "../repositories/enderecoRepository.js";

export const enderecoController = {
  show: async (req: Request, res: Response) => {
    try {
      const enderecos = await enderecoService.getAll();
      return res.status(200).json(enderecos);
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao buscar endereços!", details: err.message });
    }
  },

  showOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const endereco = await enderecoService.getById(Number(id));
      return res.status(200).json(endereco);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const data: EnderecoCreationData = req.body;
      const novoEndereco = await enderecoService.create(data);
      return res.status(201).json({
        message: "Endereço criado com sucesso!",
        object: novoEndereco,
      });
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao criar endereço!", details: err.message });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data: Partial<EnderecoCreationData> = req.body;

      const updatedEndereco = await enderecoService.update(Number(id), data);
      return res.status(200).json(updatedEndereco);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await enderecoService.delete(Number(id));
      return res.status(200).json({ message: "Endereço deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },
};
