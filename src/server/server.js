const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./auth');
const chatRoutes = require('./chat');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
