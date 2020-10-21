const express = require('express');
const router = express.Router();
const Film = require('../../models/Film');
const Post = require('../../models/Post');
const Showtime = require('../../models/Showtime');
const Booking = require('../../models/Booking');
const auth = require('../../middleware/auth');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const AWS = require('aws-sdk');
// const s3 = new AWS.S3({
//     accessKeyId: 'AKIAJUJCGZMJ3TGXOLFA',
//     secretAccessKey: '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'
// });
// const S3_BUCKET = 'cinema-bergman-images'
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const S3_BUCKET = process.env.S3_BUCKET;


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const multer = require('multer');
const storage = multer.memoryStorage({
    dest: (req, file, callback) => {
        callback(null, '')
    },
})
const upload = multer({ storage });


// @route           POST api/film
// @description     Create a new film
// @access          Private/admin
router.post(
    '/',
    auth,
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'snap', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            if (req.isAdmin === false) {
                return res.status(401).send('Not autorized');
            }
            const reqObj = JSON.parse(req.body.film);
            let film = await Film.findOne({ title: reqObj.title });
            if (film) {
                return res.status(500).send('Ce film est déjà dans la base de donnée');
            }

            const posterName = `${uuidv4()}.${MIME_TYPES[req.files['poster'][0].mimetype]}`;
            const snapName = `${uuidv4()}.${MIME_TYPES[req.files['snap'][0].mimetype]}`

            const posterParams = {
                Bucket: S3_BUCKET,
                Key: posterName,
                Body: req.files['poster'][0].buffer,
                ACL: 'public-read'
            }
            
            const snapParams = {
                Bucket: S3_BUCKET,
                Key: snapName,
                Body: req.files['snap'][0].buffer,
                ACL: 'public-read'
            }

            await s3.upload(posterParams, (error, data) => {
                if (error) {
                    throw error 
                };
                return data;
            });

            await s3.upload(snapParams, (error, data) => {
                if (error) {
                    throw error 
                };
                return data;
            });

            film = await new Film({
                ...reqObj,
                poster: `https://${S3_BUCKET}.s3.eu-west-3.amazonaws.com/${posterName}`,
                snap: `https://${S3_BUCKET}.s3.eu-west-3.amazonaws.com/${snapName}`,
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
        return res.sendFile(`https://cinema-bergman-images.s3.eu-west-3.amazonaws.com/${filename}`);
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
            if (req.isAdmin === false) {
                return res.status(401).send('Not autorized');
            }
            const oldFilm = await Film.findOne({ _id: req.params.id });
            const reqObj = req.body.film ? JSON.parse(req.body.film) : req.body;
            let film;
            if (!req.files) {
                film = { ...reqObj };
            } else if (reqObj.snap === '' && reqObj.poster !== '') {
                const snapFilename = oldFilm.snap.split('.com/')[1];
                let params = {
                    Bucket: S3_BUCKET,
                    Key: snapFilename,
                }
                await s3.deleteObject(params, error => {
                    if(error) {
                        throw error
                    } 
                    console.log(`${snapFilename} a été supprimée`)
                })

                const newSnapName = `${uuidv4()}.${MIME_TYPES[req.files['snap'][0].mimetype]}`;
                params = {
                    Bucket: S3_BUCKET,
                    Key: newSnapName,
                    Body: req.files['snap'][0].buffer,
                    ACL: 'public-read'
                }
                await s3.upload(params, error => {
                    if(error) {
                        throw error
                    } 
                    console.log(`${newSnapName} a été ajoutée`)
                })

                film = {
                    ...reqObj,
                    snap: `https://${S3_BUCKET}.s3.eu-west-3.amazonaws.com/${newSnapName}`,
                };
            } else if (reqObj.poster === '' && reqObj.snap !== '') {
                const posterFilename = oldFilm.poster.split('.com/')[1];
                let params = {
                    Bucket: S3_BUCKET,
                    Key: posterFilename,
                }
                await s3.deleteObject(params, (error, data) => {
                    if(error) {
                        throw error
                    }
                    console.log(`${posterFilename} a été supprimée`)
                })

                const newPosterName = `${uuidv4()}.${MIME_TYPES[req.files['poster'][0].mimetype]}`;
                params = {
                    Bucket: S3_BUCKET,
                    Key: newPosterName,
                    Body: req.files['poster'][0].buffer,
                    ACL: 'public-read'
                }
                await s3.upload(params, (error, data) => {
                    if(error) {
                        throw error
                    }
                    console.log(`${newPosterName} a été ajoutée`)
                })
                
                film = {
                    ...reqObj,
                    poster: `https://${S3_BUCKET}.s3.eu-west-3.amazonaws.com/${newPosterName}`
                };
            } else {
                const snapFilename = oldFilm.snap.split('.com/')[1];
                const posterFilename = oldFilm.poster.split('.com/')[1];
                const deleteFiles = files =>  {
                    for (let i = 0 ; i< files.length ; i++) {
                        const params = {
                            Bucket: S3_BUCKET,
                            Key: files[i],
                        }
                        s3.deleteObject(params, error => {
                            if(error) {
                                throw error
                            }
                            console.log(`${files[i]} a été supprimée`)
                        }) 
                    
                    }
                }
                let filesnames = [posterFilename, snapFilename];
                await deleteFiles(filesnames)


                const newPosterName = `${uuidv4()}.${MIME_TYPES[req.files['poster'][0].mimetype]}`;
                const newSnapName = `${uuidv4()}.${MIME_TYPES[req.files['snap'][0].mimetype]}`;

                const posterParams = {
                    Bucket: S3_BUCKET,
                    Key: newPosterName,
                    Body: req.files['poster'][0].buffer,
                    ACL: 'public-read'
                }
                const snapParams = {
                    Bucket: S3_BUCKET,
                    Key: newSnapName,
                    Body: req.files['snap'][0].buffer,
                    ACL: 'public-read'
                }
    
                await s3.upload(posterParams, (error, data) => {
                    if (error) {
                        throw error 
                    };
                    return data;
                });
                await s3.upload(snapParams, (error, data) => {
                    if (error) {
                        throw error 
                    };
                    return data;
                });

                film = {
                    ...reqObj,
                    poster: `https://${S3_BUCKET}.s3.eu-west-3.amazonaws.com/${newPosterName}`,
                    snap: `https://${S3_BUCKET}.s3.eu-west-3.amazonaws.com/${newSnapName}`,
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
        const snapFilename = film.snap.split('.com/')[1];
        const posterFilename = film.poster.split('.com/')[1];
        let filesnames = [posterFilename, snapFilename];
        await filesnames.forEach(path => {
            const params = {
                Bucket: S3_BUCKET,
                Key: path
            }
            s3.deleteObject(params, (error, data) => {
                if(error) {
                    throw error
                }
                console.log(`image ${path} a été supprimée`);
            });
        });
        await Post.deleteMany({film: req.params.id});
        await Showtime.deleteMany({film: req.params.id});
        await Booking.deleteMany({filmID: req.params.id});
        
        film = await Film.deleteOne({ _id: req.params.id });
        return res.status(200).json(`${film} a été supprimé de la base de donnée`);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
