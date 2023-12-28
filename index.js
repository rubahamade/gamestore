const pg = require('pg')
const client = new pg.Client('postgres://localhost/gamestore')
const express = require('express')
const app = express()


app.get('/api/videogames', async (req,res,next) => {
    try {

    } catch (error) {
        next(error)
    }
})


app.get('/api/boardgames', async (req,res,next) => {
    try {

    } catch (error) {
        next(error)
    }
})



const start = async () => {
    await client.connect()
    console.log('connected to database')

    const SQL = `
    DROP TABLE IF EXISTS videogames;
    DROP TABLE IF EXISTS boardgames;

    CREATE TABLE boardgames(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        rating INT
    );
    INSERT INTO boardgames (name, rating) VALUES ('Monopoly', 3);

    CREATE TABLE videogames(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        rating INT
    );
    INSERT INTO videogames (name, rating) VALUES ('The Legend of Zelda', 5);
    
    `
    await client.query(SQL)
    console.log("tables created")

}

start()