import express from 'express';
import { connection } from '../lib/db.js';

const movies = express.Router();

movies.get('/', async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM movies`;
        const [selectRes] = await connection.execute(selectQuery);
        return res.json(selectRes);
    } catch (error) {
        return res.status(500).json({ msg:'Server error'});
    }

});

movies.post('/', async (req, res) => {
    const { name, slug, year, director, genre, duration, image, imageAlt } = req.body;
    try {
        const insertQuery = `INSERT INTO movies 
            (name, slug, release_year, director, genre, duration, cover, cover_alt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        const [insertRes] = await connection.execute(insertQuery, 
            [name, slug, year, director, genre, duration, image, imageAlt]);
        
        if (insertRes.affectedRows === 1) {
            return res.status(201).json({msg: 'Movie created'});
        }

        return res.status(400).json({msg: 'Problems with movie creation'});
    } catch (error) {
        return res.status(500).json({ msg:'Server error'});
    }

});

export { movies };