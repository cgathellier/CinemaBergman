import React, { useState } from 'react';

import classes from './AddMovie.module.css';
import axios from 'axios';

function AddMovie() {
    const [showtimeDay, setShowtimeDay] = useState('');
    const [showtimeHour, setShowtimeHour] = useState('');
    const [showtimesArray, setShowtimesArray] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        duration: '',
        genre: '',
        classification: '',
        release: '',
        showtimes: '',
        poster: '',
        snap: '',
        synopsis: '',
    });

    const {
        title,
        director,
        duration,
        genre,
        classification,
        release,
        showtimes,
        poster,
        snap,
        synopsis,
    } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDayChange = e => {
        setShowtimeDay(e.target.value);
    };

    const onHourChange = e => {
        setShowtimeHour(e.target.value);
    };

    const addShowtime = () => {
        const horaire = { showtimeDay, showtimeHour };
        setFormData({ ...formData, showtimes: horaire });
    };

    const onSubmit = async e => {
        e.preventDefault();

        const newFilm = {
            title,
            director,
            duration,
            genre,
            classification,
            release,
            showtimes,
            poster,
            snap,
            synopsis,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify(newFilm);

        await axios.post('/api/admin/film', body, config);
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
                        placeholder='Durée *'
                        value={duration}
                        name='duration'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Genre *'
                        value={genre}
                        name='genre'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Classification *'
                        value={classification}
                        name='classification'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <label for='release'>Date de sortie *</label>
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
                    <p className={classes.addShowtimes}>Ajouter une séance *</p>
                    <div className={classes.showtimes}>
                        <div>
                            <label for='date'>Date *</label>
                            <input
                                type='date'
                                id='date'
                                value={showtimes}
                                name='showtimes'
                                required
                                onChange={e => onDayChange(e)}
                            ></input>
                        </div>
                        <div>
                            <label for='hour'>Heure *</label>
                            <input
                                type='time'
                                id='hour'
                                value={showtimes}
                                name='showtimes'
                                required
                                onChange={e => onHourChange(e)}
                            ></input>
                        </div>
                    </div>
                    <input
                        type='submit'
                        className={classes.submitSchedule}
                        value='Ajouter la séance'
                        onSubmit={() => addShowtime()}
                    ></input>
                </div>
                <div className={classes.field}>
                    <label for='poster'>Affiche du film *</label>
                    <input
                        type='file'
                        accept='.jpeg'
                        id='poster'
                        value={poster}
                        name='poster'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <label for='snap'>Image extraite du film *</label>
                    <input
                        type='file'
                        accept='.jpeg'
                        id='snap'
                        value={snap}
                        name='snap'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>

                <input type='submit' className={classes.submit} value='Continuer'></input>
            </form>
        </div>
    );
}

export default AddMovie;
