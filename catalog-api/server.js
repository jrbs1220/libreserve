const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.MYSQL_USER || 'lib_user',
  password: process.env.MYSQL_PASSWORD || 'lib_user_pass',
  database: process.env.MYSQL_DATABASE || 'library_db',
  waitForConnections: true,
  connectionLimit: 10
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'catalog-api' });
});

app.get('/', (req, res) => {
  pool.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => console.log('Catalog API active on port 5000'));