import { Request, Response } from "express";
import { documentoService } from "../services/documentoService.js";
import { DocumentoCreationData } from "../repositories/documentoRepository.js";

export const documentoController = {
  show: async (req: Request, res: Response) => {
    try {
      const documentos = await documentoService.getAll();
      return res.status(200).json(documentos);
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao buscar documentos!", details: err.message });
    }
  },

  showOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const documento = await documentoService.getById(Number(id));
      return res.status(200).json(documento);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const data: DocumentoCreationData = req.body;
      const novoDocumento = await documentoService.create(data);
      return res
        .status(201)
        .json({
          message: "Documento criado com sucesso!",
          object: novoDocumento,
        });
    } catch (error) {
      const err = error as Error;
      return res
        .status(400)
        .json({ error: "Erro ao criar documento!", details: err.message });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data: Partial<DocumentoCreationData> = req.body;

      const updatedDocumento = await documentoService.update(Number(id), data);
      return res.status(200).json(updatedDocumento);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await documentoService.delete(Number(id));
      return res
        .status(200)
        .json({ message: "Documento deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  },
};
