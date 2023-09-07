import path from 'path';
import express from 'express';
import multer from 'multer';
import { register } from './register.js';
import { login } from './login.js';
import { movies } from './movies.js';

const api = express.Router();

api.get('/', (req, res) => {
    return res.send('API ERROR: nepilnas URL');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, 'cover_' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1e7,
    }
});
api.use('/upload', upload.single('image_file'), (req, res) => {
    return res.json({
        msg: 'Upload complete...',
        path: req.file.filename,
    });
});

api.use('/register', register);
api.use('/login', login);
api.use('/movies', movies);

export { api };