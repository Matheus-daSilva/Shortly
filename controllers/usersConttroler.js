import connection from "./../db.js";

export async function getUsers(req, res) {
    const { id } = req.params;

    try {
        const user = await connection.query(`
        SELECT *
        FROM users
        WHERE id=$1`, [id]);

        if(!user.rows[0]) {
            return res.sendStatus(404);
        }

        const userViews = await connection.query(`
        SELECT  SUM("visitCount")
        FROM links 
        WHERE "userId"=$1
        `, [id])
        console.log(userViews.rows[0])

        const userUrls = await connection.query(`
        SELECT "shortUrl"
        FROM links
        WHERE "userId"=$1`, [id])
        
        const userObj = {
            id,
            name: user.rows[0].name,
            visitCount: userViews.rows[0],
            shortenedUrls: [userUrls.rows[0].shortUrl]
        }

        console.log(userObj)
        res.status(200).send(userObj)
    } catch(e) {
        console.log(e.message);
        res.sendStatus(500)
    }
}