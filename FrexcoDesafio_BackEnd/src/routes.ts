import express from "express";
import ProdutosController from "./controllers/ProdutosController";

const router = express.Router();

// PRODUTOS:

//Create - Criar
router.post("/produtos", ProdutosController.create);
//Read - Ler
router.get("/produtos", ProdutosController.findAll);
//Read one - Ler apenas um
router.get("/produtos/:produtosId", ProdutosController.findOne);
//Update - Editar
router.put("/produtos/:produtosId", ProdutosController.update);
//Delete - Deletar
router.delete("/produtos/:produtosId", ProdutosController.delete);

// ESTOQUE: 

//Create - Criar 
router.post("/estoque", async () => ({}))
//Read - Ler
router.get("/estoque", async () => ({}))
//Read one - Ler apenas um
router.get("/estoque/:estoqueId", async () => ({}))
//Update - Editar 
router.put("/estoque/:estoqueId", async () => ({}))
//Delete - Deletar 
router.delete("/estoque/:estoqueId", async () => ({}))

export { router };