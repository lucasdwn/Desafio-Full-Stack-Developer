import express from "express";
import ProdutosController from "./controllers/ProdutosController";
import EstoqueController from "./controllers/EstoqueController";

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
router.post("/estoque", EstoqueController.create)
//Read - Ler
router.get("/estoque", EstoqueController.findAll)
//Read one - Ler apenas um
router.get("/estoque/:estoqueId", EstoqueController.findOne)
// Read one - PK
router.get("/estoquepk/:estoqueId", EstoqueController.findBypk)
//Update - Editar 
router.put("/estoque/:estoqueId", EstoqueController.update)
//Delete - Deletar 
router.delete("/estoque/:estoqueId", EstoqueController.delete)
export { router };