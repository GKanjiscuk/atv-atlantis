import { Router } from "express";
import { acomodacaoController } from "../controllers/acomodacoesController.js";

const router = Router();

// (GET) Listar
router.get("/", acomodacaoController.show);

// (POST) Criar (com Builder)
router.post("/", acomodacaoController.create);

// (PUT) Editar
router.put("/:id", acomodacaoController.edit);

// (DELETE) Deletar
router.delete("/:id", acomodacaoController.delete);

export default router;