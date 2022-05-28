import { DataTypes } from "sequelize/types";
import { db } from "../db";

export const EstoqueModel = db.define('estoque', {
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
  }
});