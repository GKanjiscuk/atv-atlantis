import { Request, Response } from 'express';
import { clienteService } from '../services/clienteService.js';
import { ClienteCreationData } from '../models/dto/clienteDTO.js';

export const clienteController = {
    
    show: async (req: Request, res: Response) => {
        try {
            const clientes = await clienteService.getAll();
            return res.status(200).json(clientes);
        } catch (error) {
            const err = error as Error;
            return res.status(400).json({ error: 'Erro ao buscar clientes!', details: err.message });
        }
    },

    
    showOne: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const cliente = await clienteService.getById(Number(id));
            return res.status(200).json(cliente);
        } catch (error) {
            const err = error as Error;
            return res.status(404).json({ error: err.message });
        }
    },

    
    save: async (req: Request, res: Response) => {
        try {
            const data: ClienteCreationData = req.body;
            const novoCliente = await clienteService.create(data);
            return res.status(201).json({ message: 'Cliente criado com sucesso!', object: novoCliente });
        } catch (error) {
            const err = error as Error;
            return res.status(400).json({ error: 'Erro ao criar cliente!', details: err.message });
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updatedCliente = await clienteService.update(Number(id), req.body);
            return res.status(200).json(updatedCliente);
        } catch (error) {
            const err = error as Error;
            return res.status(404).json({ error: err.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await clienteService.delete(Number(id));
            return res.status(200).json({ message: 'Cliente e seus dados associados deletados com sucesso' });
        } catch (error) {
            const err = error as Error;
            return res.status(404).json({ error: err.message });
        }
    }
};