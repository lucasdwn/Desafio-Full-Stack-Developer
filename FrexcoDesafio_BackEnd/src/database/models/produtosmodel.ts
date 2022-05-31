import { DataTypes } from "sequelize";
import { db } from "../db";
import { EstoqueModel } from "./estoquemodel";

export const ProdutoModel = db.define('produtos', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  preco:{
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

ProdutoModel.belongsTo(EstoqueModel, {
  constraints: true,
  foreignKey: 'idEstoque'
})

EstoqueModel.hasMany(ProdutoModel, {
  foreignKey: 'idEstoque'
})