import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { api } from './api/api.js';

const PORT = 3001;
const app = express();

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('HOME PAGE');
});

app.use('/api', api);

app.get('*', (req, res) => {
    return res.send('404 PAGE');
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, () => {
    console.log(`Server on: https://localhost:${PORT}`);
});