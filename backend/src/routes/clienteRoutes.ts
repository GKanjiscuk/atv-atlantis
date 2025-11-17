import { Router } from "express";
import { clienteController } from "../controllers/clienteController.js";
import { validate } from "../../middleware/validate.js";
import { clienteSchema } from "../validation/clienteSchema.js";

const router = Router();

router.get("/", clienteController.show);
router.get("/:id", clienteController.showOne);

router.post("/", validate(clienteSchema), clienteController.save);

router.put("/:id", clienteController.edit);
router.delete("/:id", clienteController.delete);

export default router;
