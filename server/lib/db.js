import mysql from 'mysql2/promise';

let connection = null;

try {
    connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'movies',
    });
} catch (error) {
    console.log('ERROR: neprisijunge prie DB...');
}

export { connection };