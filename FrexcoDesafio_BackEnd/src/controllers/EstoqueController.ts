import { Request, Response } from "express";
import { EstoqueModel } from "../database/models/estoquemodel";
import { ProdutoModel } from "../database/models/produtosmodel";

class EstoqueController{

  async create(req:Request, res:Response){
    const { nome } = req.body;
    const estoque = await EstoqueModel.create({nome});
    return res.status(201).json(estoque);
  }

  async findAll(req:Request, res:Response){
    const estoque = await EstoqueModel.findAll()
    return estoque.length > 0?res.status(200).json(estoque):
    res.status(204).send()
  }

  async findOne(req:Request, res:Response){
    const { estoqueId } = req.params;
    const estoque = await EstoqueModel.findOne({where:{id: estoqueId}})
    return estoque ? res.status(200).json(estoque):
    res.status(204).send();
  }
  
  async findBypk(req:Request, res:Response){
    const { estoqueId } = req.params
    const estoquepk = await EstoqueModel.findByPk(estoqueId, {include: ProdutoModel})
    return estoquepk ? res.status(200).json(estoquepk):
    res.status(204).send();
  }

  async update(req:Request, res:Response){
    const { estoqueId } = req.params
    await EstoqueModel.update(req.body, {where: { id: estoqueId}});
    return res.status(204).send()
  }

  async delete(req:Request, res:Response){
    const { estoqueId } = req.params
    await EstoqueModel.destroy({where: { id: estoqueId }});
    return res.status(204).send()
  }

}

export default new EstoqueController