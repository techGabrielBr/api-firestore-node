import { Router } from "express";
import LivrosController from "../controllers/LivrosController";

const livrosRoutes = Router()
    .get('/livros', LivrosController.getAll)
    .get('/livros/:id&include=:include', LivrosController.getById)
    .post('/livros', LivrosController.create)
    .put('/livros/:id', LivrosController.update)
    .delete('/livros/:id', LivrosController.delete)

export default livrosRoutes;