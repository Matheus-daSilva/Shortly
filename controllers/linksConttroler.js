import connection from "./../db.js";
import { nanoid } from "nanoid";

export async function shortCutUrl(req, res) {
    const { url } = req.body;
    const shortUrl = nanoid();
    const { userId } = res.locals

    try {
        await  connection.query(`
        INSERT INTO links
        (url, "shortUrl", "userId")
        VALUES ($1, $2, $3)`, [url, shortUrl, userId]);

        res.status(201).send({ shortUrl })
    } catch(e) {
        console.log(e.message);
        res.sendStatus(500);
    }
    
}

export async function getUrls(req, res) {
    const { id } = req.params;
    console.log(id)

    try {
        const urls = await connection.query(`
        SELECT * 
        FROM links
        WHERE id=$1`, [id])

        if (!urls.rows[0]) {
            return res.sendStatus(404)
        } else {
            return res.status(200).send(urls.rows[0])
        }

    } catch(e) {
        console.log(e.message);
        res.sendStatus(500);
    }
}

export async function getShortUrl(req, res) {
    const { shortUrl } = req.params

    try {
        const views = await connection.query(`
        SELECT * 
        FROM links
        WHERE "shortUrl"=$1`, [shortUrl])

        if (!views.rows[0]) {
            return res.sendStatus(404);
        }

        const viewsNumber = Number(views.rows[0].visitCount) + 1;

        await connection.query(`
        UPDATE links
        SET "visitCount"=$1
        WHERE id=$2`, [viewsNumber, views.rows[0].id]);

        res.redirect(views.rows[0].url);

    } catch(e) {
        console.log(e.message);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { userId } = res.locals
    console.log(userId)

    try {
        const search = await connection.query(`
        SELECT * 
        FROM links
        WHERE id=$1`, [id]);

        if (!search.rows[0].shortUrl) {
            return res.sendStatus(404)
        }

        if (search.rows[0].userId !== userId) {
            console.log(search.rows[0].userId)
            res.status(401).send("Você não tem autorização para conclir a ação");
        } else {
            await connection.query(`
            DELETE FROM links
            WHERE id=$1`, [id]);
            res.sendStatus(200)
        }

    } catch(e) {
        console.log(e.message);
        res.sendStatus(500);
    }

}