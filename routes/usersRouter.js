import express from "express";
import { getUsers } from "../controllers/usersConttroler.js";

const usersRouter = express.Router();
usersRouter.get("/users/:id", getUsers);

export default usersRouter