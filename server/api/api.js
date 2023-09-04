import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { movies } from './movies.js';

const api = express.Router();

api.get('/', (req, res) => {
    return res.send('API ERROR: nepilnas URL');
});

api.use('/register', register);
api.use('/login', login);
api.use('/movies', movies);

export { api };