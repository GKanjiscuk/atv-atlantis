import { Router } from 'express';
import { telefoneController } from '../controllers/telefoneController.js';

const router = Router();

// Pegar todos os telefones
router.get('/', telefoneController.show);

// Pegar um telefone por ID
router.get('/:id', telefoneController.showOne);

// Inserir telefone
router.post('/', telefoneController.save);

// Editar telefone
router.put('/:id', telefoneController.edit);

// Excluir telefone
router.delete('/:id', telefoneController.delete);

export default router;