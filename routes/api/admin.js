const express = require('express');
const router = express.Router();
const Film = require('../../models/Film');
const auth = require('../../middleware/auth');

// @route           GET api/admin
// @description     Test route
// @access          Public
router.get('/', (req, res) => {
    res.send('Admin route');
});

router.post('/admin/film', auth, async (req, res) => {
    const film = await Film.findOne({ title: req.body.title });
    if (film) {
        return res.status(500).send('Ce film est déjà dans la base de donnée');
    }
});

module.exports = router;
