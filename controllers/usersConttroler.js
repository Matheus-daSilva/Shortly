import connection from "./../db.js";

export async function getUsers(req, res) {
    const { id } = req.params;

    try {
        const user = await connection.query(`
        SELECT users.id as id, users.name as name
        FROM users
        WHERE id=$1`, [id]);

        console.log(user)
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

        res.status(200).send({
            id: user.rows[0].id, 
            name: user.rows[0].name, 
            visitCount: userViews.rows[0], 
            shortenedUrls: [userUrls.rows] 
        })

    } catch(e) {
        console.log(e.message);
        res.sendStatus(500)
    }
}

export async function getRanking(req, res) {
    try {
        const ranking = await connection.query(`
            SELECT users.id, users.name, 
            COUNT(links."userId") AS "linksCount",
            COALESCE(SUM(links."visitCount"), 0) AS "visitCount" 
            FROM users
            LEFT JOIN links ON users.id=links."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10;`);
        return res.status(200).send(ranking.rows);
    } catch (e) {
        console.log(e.message);
        return res.status(500);
    }
}