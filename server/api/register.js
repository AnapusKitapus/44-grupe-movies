import express from 'express';
import { connection } from '../lib/db.js';

const register = express.Router();

register.get('/', (req, res) => {
    return res.json({msg: 'GET: REGISTER API'});
});

register.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const minUsernameSize = 2;
    const minEmailSize = 6;
    const minPasswordSize = 6;

    const errors = [];
    if (typeof username !== 'string' || username.length < minUsernameSize) {
        errors.push({
            input: 'username',
            msg: 'Blogas username. Per trumpas',
        });
    }
    if (typeof email !== 'string' || email.length < minEmailSize) {
        errors.push({
            input: 'email',
            msg: 'Blogas email. Per trumpas',
        });
    }
    if (typeof password !== 'string' || password.length < minPasswordSize) {
        errors.push({
            input: 'password',
            msg: 'Blogas password. Per trumpas',
        });
    }

    if (errors.length > 0) {
        return res.status(409).json(errors);
    }

    try {

        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [email]);

        if (selectRes.length > 0) {
            return res.status(200).json({ msg: 'User with such email already exist.' });
        }

        const insertQuery = `INSERT INTO users 
                        (username, email, password) 
                    VALUES 
                        (?, ?, ?);`;
        const [insertRes] = await connection.execute(insertQuery, [username, email, password]);

        if (insertRes.insertId > 0) {
            return res.status(200).json({ msg: 'POST: REGISTER API - ok, user created' });
        } else {
            return res.status(400).json({ msg: 'POST: REGISTER API - error....' });
        }
    } catch(error) {
        return res.status(500).json({ msg: 'POST: REGISTER API - server error.' });
    }
    
});

export { register };