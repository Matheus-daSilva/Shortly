import express from "express";
import { shortCutUrl, getUrls, getShortUrl, deleteUrl } from "../controllers/linksConttroler.js";
import { urlValidation } from "../middlewares/linksMiddleware.js";
import { tokenValidation } from "../middlewares/tokenMiddleware.js";

const linksRouter = express.Router();
linksRouter.post("/urls/shorten", tokenValidation, urlValidation, shortCutUrl);
linksRouter.get("/urls/open/:shortUrl", getShortUrl);
linksRouter.get("/urls/:id", getUrls);
linksRouter.delete("/urls/:id", tokenValidation, deleteUrl);

export default linksRouter