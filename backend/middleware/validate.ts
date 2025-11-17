import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // Tenta validar o corpo da requisição
        schema.parse(req.body);
        // Se for válido, continua para o Controller
        next();
    } catch (error) {
        // Se for inválido (erro do Zod), retorna um Erro 400
        return res.status(400).json({
            error: "Dados de entrada inválidos",
            details: (error as any).errors 
        });
    }
};