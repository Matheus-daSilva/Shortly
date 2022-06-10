import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js"
import linksRouter from "./routes/linksRouter.js";
import chalk from "chalk";

const app = express();

app.use(json());
app.use(cors());
dotenv.config();

app.use(authRouter);
app.use(linksRouter);

app.listen(process.env.PORT, () => console.log(chalk.green.bold("O servidor está rodando")));