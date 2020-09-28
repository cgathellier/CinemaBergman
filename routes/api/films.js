const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const Film = require('../../models/Film');
const auth = require('../../middleware/auth');
const fs = require('fs');
// const multer = require('../../middleware/auth');

const multer = require('multer');
const upload = multer({ dest: 'images/' });

// @route           POST api/film
// @description     Create a new film
// @access          Private/admin

// [
//     check('title', 'Le titre du film est requis').not().isEmpty(),
//     check('director', 'Le nom du réalisateur est requis').not().isEmpty(),
//     check('duration', 'La durée du film est requise').not().isEmpty(),
//     check('genre', 'Le genre du film est requis').not().isEmpty(),
//     check('classification', 'La classification du film est requise').not().isEmpty(),
//     check('release', 'La date de sortie est requise').not().isEmpty(),
//     check('showtimes', 'Veuillez indiquer des séances pour ce film').isArray(),
//     check('poster', 'Une affiche du film est attendue').not().isEmpty(),
//     // check('snap', 'Une image tirée du film est attendue').not().isEmpty(),
//     check('synopsis', 'Le synopsis du film est requis').not().isEmpty(),
// ],

router.post(
    '/',
    auth,
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'snap', maxCount: 1 },
    ]),
    async (req, res) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(500).json({ errors: errors.array() });
        // }
        try {
            const reqObj = JSON.parse(req.body.film);
            console.log(req.files);
            let film = await Film.findOne({ title: reqObj.title });
            if (film) {
                return res.status(500).send('Ce film est déjà dans la base de donnée');
            }

            film = new Film({
                ...reqObj,
                poster: `${req.protocol}://${req.get('host')}/images/${req.files['poster'][0].filename}`,
                snap: `${req.protocol}://${req.get('host')}/images/${req.files['snap'][0].filename}`,
            });

            await film.save();
            return res.status(201).json(film);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

// @route           GET api/film
// @description     Get all films
// @access          Public

router.get('/', async (req, res) => {
    try {
        let films = await Film.find();
        return res.status(200).json(films);
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});

// @route           GET api/film/:id
// @description     Get one film
// @access          Public

router.get('/:id', async (req, res) => {
    try {
        let film = await Film.findOne({ _id: req.params.id });
        return res.status(200).json(film);
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});

// @route           GET api/film/images/:filename
// @description     Get image from static folder
// @access          Public

router.get('/images/:filename', async (req, res) => {
    try {
        filename = req.params.filename;
        return res.sendFile(`${__dirname}/images/${filename}.jpeg`);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// @route           PUT api/film/:id
// @description     Modify a film
// @access          Admin

router.put(
    '/:id',
    auth,
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'snap', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const oldFilm = await Film.findOne({ _id: req.params.id });
            const reqObj = req.body.film ? JSON.parse(req.body.film) : req.body;
            let film;
            if (!req.files) {
                film = { ...reqObj };
            } else if (reqObj.snap === '' && reqObj.poster !== '') {
                const snapFilename = oldFilm.snap.split('/images/')[1];
                fs.unlink(`images/${snapFilename}`, () => {
                    console.log(`image ${snapFilename} supprimée`);
                    film = {
                        ...reqObj,
                        snap: `${req.protocol}://${req.get('host')}/images/${req.files['snap'][0].filename}`,
                    };
                });
            } else if (reqObj.poster === '' && reqObj.snap !== '') {
                const posterFilename = oldFilm.poster.split('/images/')[1];
                fs.unlink(`images/${posterFilename}`, () => {
                    film = {
                        ...reqObj,
                        poster: `${req.protocol}://${req.get('host')}/images/${
                            req.files['poster'][0].filename
                        }`,
                    };
                });
            } else {
                const snapFilename = oldFilm.snap.split('/images/')[1];
                const posterFilename = oldFilm.poster.split('/images/')[1];
                let filesnames = [posterFilename, snapFilename];
                filesnames.forEach(path => {
                    fs.unlink(`images/${path}`, () => {
                        console.log(`image ${path} a été supprimée`);
                    });
                });
                film = {
                    ...reqObj,
                    poster: `${req.protocol}://${req.get('host')}/images/${req.files['poster'][0].filename}`,
                    snap: `${req.protocol}://${req.get('host')}/images/${req.files['snap'][0].filename}`,
                };
            }
            await Film.updateOne({ _id: req.params.id }, { ...film, _id: req.params.id });
            return res.status(200).json(film);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

// @route           DELETE api/film/:id
// @description     Delete a film
// @access          Admin

router.delete('/:id', auth, async (req, res) => {
    try {
        let film = await Film.findOne({ _id: req.params.id });
        const snapFilename = film.snap.split('/images/')[1];
        const posterFilename = film.poster.split('/images/')[1];
        let filesnames = [posterFilename, snapFilename];
        await filesnames.forEach(path => {
            fs.unlink(`images/${path}`, () => {
                console.log(`image ${path} a été supprimée`);
            });
        });
        film = await Film.deleteOne({ _id: req.params.id });
        return res.status(202).json(`${film} a été supprimé de la base de donnée`);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
