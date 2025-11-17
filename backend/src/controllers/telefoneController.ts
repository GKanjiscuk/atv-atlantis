import { Request, Response } from "express";
import { telefoneService } from "../services/telefoneService.js";
import { TelefoneCreationData } from "../repositories/telefoneRepository.js";

export const telefoneController = {
  show: async (req: Request, res: Response) => {
    try {
      const telefones = await telefoneService.getAll();
      return res.status(200).json(telefones);
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao buscar telefones!", details: err.message });
    }
  },

  showOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const telefone = await telefoneService.getById(Number(id));
      return res.status(200).json(telefone);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },

  save: async (req: Request, res: Response) => {
    try {      const data: TelefoneCreationData = req.body;
      const novoTelefone = await telefoneService.create(data);
      return res
        .status(201)
        .json({
          message: "Telefone criado com sucesso!",
          object: novoTelefone,
        });
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao criar telefone!", details: err.message });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data: Partial<TelefoneCreationData> = req.body;

      const updatedTelefone = await telefoneService.update(Number(id), data);
      return res.status(200).json(updatedTelefone);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await telefoneService.delete(Number(id));
      return res.status(200).json({ message: "Telefone deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },
};
