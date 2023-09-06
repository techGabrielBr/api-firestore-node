import { Router } from "express";
import AutoresController from "../controllers/AutoresController";

const autoresRoutes = Router()
    .get('/autores', AutoresController.getAll)
    .get('/autores/:id', AutoresController.getById)
    .post('/autores', AutoresController.create)
    .put('/autores/:id', AutoresController.update)
    .delete('/autores/:id', AutoresController.delete)

export default autoresRoutes;