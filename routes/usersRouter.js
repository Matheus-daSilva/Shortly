import express from "express";
import { getRanking, getUsers } from "../controllers/usersConttroler.js";

const usersRouter = express.Router();
usersRouter.get("/users/:id", getUsers);
usersRouter.get("/ranking", getRanking);

export default usersRouter