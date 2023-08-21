import express from 'express';
import { connection } from '../lib/db.js';

const register = express.Router();

register.get('/', (req, res) => {
    return res.json({msg: 'GET: REGISTER API'});
});

register.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    
    const query = `INSERT INTO users 
                        (username, email, password) 
                    VALUES 
                        (?, ?, ?);`;

    const [dbRes] = await connection.execute(query, [username, email, password]);
    
    if (dbRes.insertId > 0) {
        return res.status(200).json({ msg: 'POST: REGISTER API - ok, user created' });
    } else {
        return res.status(400).json({ msg: 'POST: REGISTER API - error....' });
    }
});

export { register };