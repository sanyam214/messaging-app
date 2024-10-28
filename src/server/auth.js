const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO app_users (id, username, email, password) VALUES (?, ?, ?, ?)', [id, username, email, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered');
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM app_users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).send('User not found');
        const user = results[0];

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'ansdj0swdavkmanehfblx#$%ndc');
            console.log(token)
            res.json({ token, user });
        } else {
            res.status(400).send('Invalid password');
        }
    });
});

module.exports = router;
