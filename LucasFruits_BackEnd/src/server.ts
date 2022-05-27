import express from "express";

const app = express()

app.listen(3001, () => {
  console.log("Olá, a API está rodando na porta:3001 !")
});