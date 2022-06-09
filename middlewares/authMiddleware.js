import connection from "./../db.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

export async function schemaValidationSignIn(req, res, next) {
    const { body } = req;
    const validation = signInSchema.validate(body, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send("Preencha todos os campos corretamente");
    }

    next()
} 

export async function schemaValidationSignUpUser(req, res, next) {
    const { email } = req.body;

    try {
        const user = await connection.query(`
        SELECT * 
        FROM users 
        WHERE email=$1`, [email]);

        if (user.rows[0]) {
            res.status(422).send("Usuário já cadastrado");
        }
    } catch(e) {

        console.log(e);
        res.sendStatus(500);
    }

    next();

}

export async function schemaValidationSignUpData(req, res, next) {
    const { body } = req;
   
    const validation = signUpSchema.validate(body, {abortEarly: false});

    if (validation.error) {
        return res.status(422).send("Preencha todos os campos corretamente");
    }

    next();
}
