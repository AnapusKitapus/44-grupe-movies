import express from 'express';
import { register } from './register.js'

const api = express.Router();

api.get('/', (req, res) => {
    return res.send('API ERROR: nepilnas URL');
});

api.use('/register', register);

export { api };