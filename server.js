const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'khoa',
    database: 'user_information'
});

db.connect(err => {
    if (err) throw err;
    console.log('kết nối thành công  database');
});

app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    db.query(sql, [name, email, age], (err, result) => {
        if (err) throw err;
        res.send(' tạo thành công ');
    });
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, age } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(sql, [name, email, age, userId], (err, result) => {
        if (err) throw err;
        res.send('Thêm thành công');
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        res.send('xóa ok ');
    });
});

app.listen(port, () => {
    console.log(`   ------> Server đang chạy  ${port}`);
});
