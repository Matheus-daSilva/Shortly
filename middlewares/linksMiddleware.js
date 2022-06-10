import connection from "../db.js";
import { linkSchema } from "../schemas/linkSchema.js";

export async function urlValidation(req, res, next) {
    const { url } = req.body;
    const validation = linkSchema.validate({url}, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send("URL inválida");
    }

    next()
}