import { Request, Response} from "express";
import { ProdutoModel } from "../database/models/produtosmodel";

class ProdutoController {
  
  async create(req:Request, res:Response) {
    const { nome, preco, idEstoque} = req.body;
    const produtos = await ProdutoModel.create({
      nome,
      preco,
      idEstoque,
    });
    return res.status(201).json(produtos);
  }

  async findAll(req:Request, res:Response) {
    const produtos = await ProdutoModel.findAll()
    return produtos.length > 0?res.status(200).json(produtos):
    res.status(204).send();
  }

  async findOne(req:Request, res:Response) {
    const { produtosId } = req.params;
    const produtos = await ProdutoModel.findOne({
      where:{
        id: produtosId
      }
    })
    return produtos ? res.status(200).json(produtos) :
    res.status(204).send();
  }

  async update(req:Request, res:Response) {
    const { produtosId } = req.params;
    await ProdutoModel.update(req.body, {where: { id: produtosId}});
    return res.status(204).send();
  }
  
  async delete(req:Request, res:Response) {
    const { produtosId } = req.params
    await ProdutoModel.destroy({ where: { id: produtosId }});
    return res.status(204).send();
  }
}

export default new ProdutoController();