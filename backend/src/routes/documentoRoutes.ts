import { Router } from 'express';
import { documentoController } from '../controllers/documentoController.js';

const router = Router();

// Pegar todos os documentos
router.get('/', documentoController.show);

// Pegar um documento por ID
router.get('/:id', documentoController.showOne);

// Inserir documento
router.post('/', documentoController.save);

// Editar documento
router.put('/:id', documentoController.edit);

// Excluir documento
router.delete('/:id', documentoController.delete);

export default router;