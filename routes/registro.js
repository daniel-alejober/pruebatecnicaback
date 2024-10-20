import express from "express";
import {
  traerRegistros,
  crearRegistro,
  editarRegistro,
  borrarRegistro,
} from "../controllers/registro.js";

const router = express.Router();
router.get("/", traerRegistros);
router.post("/", crearRegistro);
router.put("/:id", editarRegistro);
router.delete("/:id", borrarRegistro);

export default router;
