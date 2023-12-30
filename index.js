const pg = require('pg')
const client = new pg.Client('postgres://localhost/gamestore')
const express = require('express')
const app = express()

app.use(express.json())


// CRUD VIDEO GAMES

app.get('/api/videogames', async (req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM videogames
        `
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})


app.get('/api/videogames/:id', async (req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM videogames
            WHERE id = $1
        `
        const response = await client.query(SQL, [req.params.id])
        res.send(response.rows[0])
    } catch (error) {
        next(error)
    }
})


app.delete('/api/videogames/:id', async (req,res,next) => {
    try {
        const SQL = `
            DELETE
            FROM videogames
            WHERE id = $1
        `
        const response = await client.query(SQL, [req.params.id])
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})


app.post('/api/videogames', async (req,res,next) => {
    console.log(req.body)
    try {
        const SQL = `
        INSERT INTO videogames (name, year, rating)
        VALUES($1, $2, $3)
        RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.year, req.body.rating])
        res.send(response.rows)
    } catch (error) {
        next(error)
    }

})


app.put('/api/videogames/:id', async (req,res,next) => {
    try {
        const SQL =`
            UPDATE videogames
            SET name = $1, year = $2, rating = $3
            WHERE id = $4
            RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.year, req.body.rating, req.params.id])
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})




// CRUD BOARD GAMES

app.get('/api/boardgames', async (req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM boardgames
        `
        const response = await client.query(SQL)
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})

app.get('/api/boardgames/:id', async (req,res,next) => {
    try {
        const SQL = `
            SELECT *
            FROM boardgames
            WHERE id = $1
        `
        const response = await client.query(SQL, [req.params.id])
        res.send(response.rows[0])
    } catch (error) {
        next(error)
    }
})

app.delete('/api/boardgames/:id', async (req,res,next) => {
    try {
        const SQL = `
            DELETE
            FROM boardgames
            WHERE id = $1
        `
        const response = await client.query(SQL, [req.params.id])
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

app.post('/api/boardgames', async (req,res,next) => {
    console.log(req.body)
    try {
        const SQL = `
        INSERT INTO boardgames (name, price, rating)
        VALUES($1, $2, $3)
        RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.price, req.body.rating])
        res.send(response.rows)
    } catch (error) {
        next(error)
    }

})

app.put('/api/boardgames/:id', async (req,res,next) => {
    try {
        const SQL =`
            UPDATE boardgames
            SET name = $1, price = $2, rating = $3
            WHERE id = $4
            RETURNING *
        `
        const response = await client.query(SQL, [req.body.name, req.body.price, req.body.rating, req.params.id])
        res.send(response.rows)
    } catch (error) {
        next(error)
    }
})



//



const start = async () => {
    await client.connect()
    console.log('connected to database')

    const SQL = `
    DROP TABLE IF EXISTS videogames;
    DROP TABLE IF EXISTS boardgames;

    CREATE TABLE boardgames(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        price INT,
        rating INT
    );
    INSERT INTO boardgames (name, price, rating) VALUES ('Monopoly', 15, 3);
    INSERT INTO boardgames (name, price, rating) VALUES ('Scrabble', 40, 3);
    INSERT INTO boardgames (name, price, rating) VALUES ('Clue', 10, 3);
    INSERT INTO boardgames (name, price, rating) VALUES ('Candy Land', 13, 3);

    CREATE TABLE videogames(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        year INT,
        rating INT
    );
    INSERT INTO videogames (name, year, rating) VALUES ('The Legend of Zelda: Breath of the Wild', 2017, 4);
    INSERT INTO videogames (name, year, rating) VALUES ('FIFA', 2023, 5);
    INSERT INTO videogames (name, year, rating) VALUES ('Assassins Creed Valhalla', 2020, 4);
    INSERT INTO videogames (name, year, rating) VALUES ('Red Dead Redemption 2', 2018, 4);
    
    `
    await client.query(SQL)
    console.log("tables created")

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`app running on port ${port}`)
    })

}

start()