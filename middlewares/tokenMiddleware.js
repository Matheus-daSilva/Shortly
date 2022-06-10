import connection from "./../db.js";

export async function tokenValidation(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) {
       return res.sendStatus(401);
    }

    try { 
        const validate = await connection.query(`
        SELECT * FROM tokens WHERE token=$1
        `, [token]);

        if (!validate.rows[0]) {
            res.sendStatus(401);
        } else {
            res.locals.userId = validate.rows[0].id;
        }
    } catch(e) {
        console.log(e.message);
        res.sendStatus(500)
    }

    next();
}