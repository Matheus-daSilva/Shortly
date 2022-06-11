import connection from "./../db.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function signInConttroler(req, res) {
    const { email, password } = req.body;

    try {
        const user = await connection.query(`
        SELECT *
        FROM users
        WHERE email=$1`, [email]);
        console.log(user.rows[0])

        if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].password)) {
            const token = v4();
            await connection.query(`
            INSERT INTO "tokens"
            ("userId", token)
            VALUES ($1, $2)
            `, [user.rows[0].id, token])

            return res.sendStatus(200);
        } else {
            res.status(401).send("Usuário ou senha incorreta");
        }

    } catch(e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function signUpConttroler(req, res) {
    const { name, password, email } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await connection.query(`
        INSERT INTO "users"
        (name, password, email)
        VALUES ($1, $2, $3)
        `, [name, passwordHash, email]);

        res.sendStatus(201);
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}