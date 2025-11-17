import { Router } from 'express';
import { enderecoController } from '../controllers/enderecoController.js';

const router = Router();

// Pegar todos os endereços
router.get('/', enderecoController.show);

// Pegar um endereço por ID
router.get('/:id', enderecoController.showOne);

// Inserir endereço
router.post('/', enderecoController.save);

// Editar endereço
router.put('/:id', enderecoController.edit);

// Excluir endereço
router.delete('/:id', enderecoController.delete);

export default router;