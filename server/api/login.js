import { randomUUID } from 'crypto';
import express from 'express';
import { connection } from '../lib/db.js';
import { log } from 'console';

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
        return res.status(409).json({ 
            status: 'err-list', 
            errors 
        });
    }

    console.log(req.body);

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [email, password]);
        
        if (selectRes.length !== 1) {
            return res.status(200).json({ 
                status: 'err', 
                msg: 'Login credentials does not match.' 
            });
        }

        const token = randomUUID();
        const insertQuery = `INSERT INTO tokens 
                            (token, userId) 
                        VALUES 
                            (?, ?);`;
        const [insertRes] = await connection.execute(insertQuery, [token, selectRes[0].id]);

        if (insertRes.affectedRows !== 1) {
            return res.status(500).json({ 
                status: 'err', 
                msg: 'Server error.' 
            });
        }

        return res.status(200).set({
            'Set-Cookie': [
                'moviesToken=' + token,
                'path=/',
                'domain=localhost',
                'max-age=86400',
                // 'Secure',
                'SameSite=Lax',
                'HttpOnly',
            ].join('; '),
        }).json({
            status: 'ok',
            msg: 'Login success',
        });
    } catch (error) {
        return res.status(500).json({ 
            status: 'err', 
            msg: 'Server error.' 
        });
    }  
});

export { login };