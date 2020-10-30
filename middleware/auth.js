const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Pas de token, autorisation refusée' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        req.isAdmin = decoded.isAdmin;
        next();
    } catch (error) {
        res.status(401).send('Token non valide');
    }
};
