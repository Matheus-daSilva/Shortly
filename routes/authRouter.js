import express from "express";
import { signInConttroler, signUpConttroler } from "../controllers/authConttroler.js";
import { schemaValidationSignIn, schemaValidationSignUpUser, schemaValidationSignUpData } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();
authRouter.post("/signin", schemaValidationSignIn, signInConttroler);
authRouter.post("/signup", schemaValidationSignUpUser, schemaValidationSignUpData, signUpConttroler);

export default authRouter;