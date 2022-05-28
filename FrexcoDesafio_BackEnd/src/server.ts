import express, { json } from "express";
import { db } from "./database/db";
import { router } from "./routes";

const app = express();

app.use(json());
app.use(router);

app.listen(3001, async () => {
  await db.sync();
  console.log("Olá, a API está rodando na porta:3001 !")
});