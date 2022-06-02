import express, { json } from "express";
import { db } from "./database/db";
import { router } from "./routes";
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccesStatus: 200
};

app.use(cors(corsOptions));
app.use(json());
app.use(router);

app.listen(3001, async () => {
  await db.sync();
  console.log("Olá, a API está rodando na porta:3001 !")
});