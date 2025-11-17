import { Request, Response } from "express";
import { acomodacaoService } from "../services/acomodacaoService.js";

export const acomodacaoController = {

  show: async (req: Request, res: Response) => {
    try {
      const acomodacao = await acomodacaoService.getAll();
      return res.status(200).json(acomodacao);
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao buscar acomodação!", details: err.message });
    }
  },


  create: async (req: Request, res: Response) => {
    try {
      const { tipo } = req.body;
      if (!tipo) {
        return res.status(400).json({ error: 'O campo "tipo" é obrigatório.' });
      }
      const novaAcomodacao = await acomodacaoService.create(tipo);
      return res.status(201).json(novaAcomodacao);
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao criar acomodação!", details: err.message });
    }
  },


  edit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const acomodacaoAtualizada = await acomodacaoService.update(Number(id), data);
      return res.status(200).json(acomodacaoAtualizada);
    } catch (error) {
      const err = error as Error;
      return res
        .status(404)
        .json({ error: "Erro ao atualizar acomodação!", details: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await acomodacaoService.delete(Number(id));
      return res.status(200).json({ message: "Acomodação deletada com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res
        .status(404)
        .json({ error: "Erro ao deletar acomodação!", details: err.message });
    }
  },
};