const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log(req.headers['authorization'].split(' ')[1])
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, 'ansdj0swdavkmanehfblx#$%ndc', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
