import express, { json } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js"

const app = express();
app.use(json());
dotenv.config();

app.use(authRouter);

app.listen(process.env.PORT, () => console.log('O servidor está rodando'));