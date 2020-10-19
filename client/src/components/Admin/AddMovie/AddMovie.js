import React, { useEffect, useState } from 'react';
import classes from './AddMovie.module.css';
import axios from 'axios';
import history from '../../../history';

class Film {
    title;
    director;
    actors;
    duration;
    genre;
    classification;
    release;
    poster;
    snap;
    synopsis;
}

const AddMovie = () => {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        actors: '',
        duration: '',
        genre: 'Comédie',
        classification: 'Tous publics',
        release: '',
        poster: '',
        snap: '',
        synopsis: '',
    });

    const {
        title,
        director,
        actors,
        duration,
        genre,
        classification,
        release,
        poster,
        snap,
        synopsis,
    } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onPosterChange = e => {
        const newPoster = e.target.files[0];
        setFormData({ ...formData, poster: newPoster });
    };

    const onSnapChange = e => {
        const newSnap = e.target.files[0];
        setFormData({ ...formData, snap: newSnap });
    };

    const onSubmit = e => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token,
                },
            };

            const newFilm = new Film();
            newFilm.title = title;
            newFilm.director = director;
            newFilm.actors = actors;
            newFilm.duration = duration;
            newFilm.genre = genre;
            newFilm.classification = classification;
            newFilm.release = release;
            newFilm.poster = '';
            newFilm.snap = '';
            newFilm.synopsis = synopsis;

            // const uploadFile = async signedReq => {
            //     const resUpload = await axios.put(signedReq)
            //     return resUpload.status;
            // }

            const getSignedReq = async file => {
                const name = file.name.split(' ').join('_');
                console.log(file.type)
                const resSigned = await axios.get(`/api/sign-s3/${name}/${file.type}`)
                console.log(resSigned)
                // newFilm[file] = resSigned.url;
                // const resUpload = await axios.put(resSigned.signedRequest)
                // uploadFile(resSigned.signedRequest)
            }

            const createNewFilmWithFile = async () => {
                await getSignedReq(poster);
                await getSignedReq(snap);
                const body = JSON.stringify(newFilm)
                const res = await axios.post('/api/films', body, config);
                return res.data;
            }

            createNewFilmWithFile()


            // const createNewFilmWithFile = async (film, poster, snap) => {
            //     const formData = new FormData();
            //     formData.append('film', JSON.stringify(film));
            //     formData.append('poster', poster, film.title);
            //     formData.append('snap', snap, film.title);
            //     const res = await axios.post('/api/films', formData, config);
            //     if (res.status === 201) {
            //         window.scroll(0, 0);
            //         history.push(`/admin/modifymovie/${res.data._id}`);
            //     }
            //     return res.data;
            // };

            // createNewFilmWithFile(newFilm, poster, snap);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.container}>
            <form className={classes.Form} onSubmit={e => onSubmit(e)}>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Titre *'
                        value={title}
                        name='title'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Réalisateur *'
                        value={director}
                        name='director'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Acteurs et actrices, séparés par une virgule *'
                        value={actors}
                        name='actors'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Durée *'
                        value={duration}
                        name='duration'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={[classes.field, classes.list].join(' ')}>
                    <label htmlFor='Genre'>Genre *</label>
                    <select
                        type='text'
                        value={genre}
                        name='genre'
                        required
                        onChange={e => onChange(e)}
                        id='Genre'
                    >
                        <option value='Comédie'>Comédie</option>
                        <option value='Drame'>Drame</option>
                        <option value='Historique'>Historique</option>
                        <option value='Thriller'>Thriller</option>
                        <option value='Horreur'>Horreur</option>
                        <option value='Romance'>Romance</option>
                        <option value='Science-Fiction'>Science-Fiction</option>
                        <option value='Guerre'>Guerre</option>
                        <option value='Action'>Action</option>
                        <option value='Documentaire'>Documentaire</option>
                        <option value='Aventure'>Aventure</option>
                        <option value='Policier'>Policier</option>
                    </select>
                </div>
                <div className={[classes.field, classes.list].join(' ')}>
                    <label htmlFor='Classification'>Classification *</label>
                    <select
                        type='text'
                        value={classification}
                        name='classification'
                        required
                        onChange={e => onChange(e)}
                        id='Classification'
                    >
                        <option value='Tous publics'>Tous publics</option>
                        <option value='-12'>-12</option>
                        <option value='-16'>-16</option>
                        <option value='-18'>-18</option>
                    </select>
                </div>
                <div className={classes.field}>
                    <label htmlFor='release'>Date de sortie *</label>
                    <input
                        type='date'
                        id='release'
                        value={release}
                        name='release'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Synopsis *'
                        value={synopsis}
                        name='synopsis'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <label htmlFor='poster'>Affiche du film *</label>
                    <input
                        type='file'
                        accept='.jpeg,.jpg,.png'
                        id='poster'
                        name='image'
                        required
                        onChange={e => onPosterChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <label htmlFor='snap'>Image extraite du film *</label>
                    <input
                        type='file'
                        accept='.jpeg,.jpg,.png'
                        id='snap'
                        name='image'
                        required
                        onChange={e => onSnapChange(e)}
                    ></input>
                </div>

                <input
                    type='submit'
                    className={classes.submit}
                    value='Poursuivre et ajouter des séances'
                ></input>
            </form>
        </div>
    );
};

export default AddMovie;
