import express from 'express';
import { connection } from '../lib/db.js';

const login = express.Router();

login.get('/', (req, res) => {
    return res.json({msg: 'GET: LOGIN API'});
});

login.post('/', async (req, res) => {
    const { email, password } = req.body;
    const minEmailSize = 6;
    const minPasswordSize = 6;

    const errors = [];
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

    console.log(req.body);

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [email, password]);

        if (selectRes.length !== 1) {
            return res.status(200).json({ msg: 'Login credentials does not match.' });
        }

        return res.status(200).json({ msg: 'POST: LOGIN API - ok, user logged in into the system.' });
    } catch (error) {
        return res.status(500).json({ msg: 'POST: REGISTER API - server error.' });
    }
    
});

export { login };