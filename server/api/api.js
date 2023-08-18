import express from 'express';

const api = express.Router();

api.get('/', (req, res) => {
    return res.send('API ERROR: nepilnas URL');
});

api.get('/register', (req, res) => {
    return res.send('REGISTER API');
});

export { api };