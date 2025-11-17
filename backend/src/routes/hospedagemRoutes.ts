import { Router } from 'express';
import { hospedagemController } from '../controllers/hospedagemController.js';

const router = Router();

// Pegar todas as hospedagens
router.get('/', hospedagemController.show);

// Pegar uma hospedagem por ID
router.get('/:id', hospedagemController.showOne);

// Inserir hospedagem (com transação)
router.post('/', hospedagemController.save);

// Editar hospedagem (com transação)
router.put('/:id', hospedagemController.edit);

// Excluir hospedagem (com cascade)
router.delete('/:id', hospedagemController.delete);

export default router;