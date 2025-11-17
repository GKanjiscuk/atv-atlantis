import { Request, Response } from 'express';
import { hospedagemService } from '../services/hospedagemService.js';
import { HospedagemCreationData } from '../models/dto/hospedagemDTO.js';

export const hospedagemController = {
    
    show: async (req: Request, res: Response) => {
        try {
            const hospedagens = await hospedagemService.getAll();
            return res.status(200).json(hospedagens);
        } catch (error) {
            const err = error as Error;
            return res.status(400).json({ error: 'Erro ao buscar hospedagens!', details: err.message });
        }
    },

    showOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const hospedagem = await hospedagemService.getById(Number(id));
            return res.status(200).json(hospedagem);
        } catch (error) {
            const err = error as Error;
            return res.status(404).json({ error: err.message });
        }
    },

    save: async (req: Request, res: Response) => {
        try {
            
            const data: HospedagemCreationData = req.body;
            const novaHospedagem = await hospedagemService.create(data);
            return res.status(201).json({ message: 'Hospedagem criada com sucesso!', object: novaHospedagem });
        } catch (error) {
            const err = error as Error;
            return res.status(400).json({ error: 'Erro ao criar hospedagem!', details: err.message });
        }
    },

    
    edit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data: HospedagemCreationData = req.body;
            
            const updatedHospedagem = await hospedagemService.update(Number(id), data);
            return res.status(200).json(updatedHospedagem);
        } catch (error) {
            const err = error as Error;
            return res.status(404).json({ error: err.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await hospedagemService.delete(Number(id));
            return res.status(200).json({ message: 'Hospedagem deletada com sucesso' });
        } catch (error) {
            const err = error as Error;
            return res.status(404).json({ error: err.message });
        }
    }
};