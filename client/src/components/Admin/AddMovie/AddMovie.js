import React, { useState } from 'react';

import classes from './AddMovie.module.css';
import axios from 'axios';

function AddMovie() {
    const [Day, setDay] = useState('');
    const [Hour, setHour] = useState('');
    const [showtimesArray, setShowtimesArray] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        duration: '',
        genre: '',
        classification: '',
        release: '',
        showtimes: null,
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

    let showtimesElt = showtimesArray.map((showtime, index) => {
        const { Day, Hour } = showtime;
        return (
            <div key={index} className={classes.st_elt}>
                {Day}, {Hour}
                <div className={classes.crossContainer}>
                    <i
                        className={['fas fa-times', classes.cross].join(' ')}
                        onClick={e => onClickCross(e)}
                        day={Day}
                        hour={Hour}
                    ></i>
                </div>
            </div>
        );
    });

    const onClickCross = e => {
        let targetDay = e.target.getAttribute('day');
        let targetHour = e.target.getAttribute('hour');
        setShowtimesArray(
            showtimesArray.filter(
                item => item[Object.keys(item)[0]] !== targetDay && item[Object.keys(item)[1]] !== targetHour
            )
        );
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onDayChange = e => {
        setDay(e.target.value);
    };

    const onHourChange = e => {
        setHour(e.target.value);
    };

    const addShowtime = () => {
        if (!Day || !Hour) {
            return alert('Les champs pour ajouter une séance ne sont pas tous remplis');
        }
        const horaire = { Day, Hour };
        setShowtimesArray(showtimesArray => [...showtimesArray, horaire]);
        setDay('');
        setHour('');
    };

    const onSubmit = async e => {
        e.preventDefault();

        setFormData({ ...formData, showtimes: showtimesArray });

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

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(newFilm);

            await axios.post('/api/admin/film', body, config);
        } catch (error) {
            if (error.response.data) {
                return console.log(error.response.data);
            }
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
                    <p className={classes.addShowtimes}>Ajouter une séance *</p>
                    <div className={classes.showtimesInputs}>
                        <div>
                            <label htmlFor='date'>Date *</label>
                            <input
                                type='date'
                                id='date'
                                value={Day}
                                name='showtimes'
                                required
                                onChange={e => onDayChange(e)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='hour'>Heure *</label>
                            <input
                                type='time'
                                id='hour'
                                value={Hour}
                                name='showtimes'
                                required
                                onChange={e => onHourChange(e)}
                            ></input>
                        </div>
                    </div>
                    <div className={classes.submitSchedule} onClick={() => addShowtime()}>
                        Ajouter la séance
                    </div>
                    <div className={classes.st_list}>{showtimesElt}</div>
                </div>
                <div className={classes.field}>
                    <label htmlFor='poster'>Affiche du film *</label>
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
                    <label htmlFor='snap'>Image extraite du film *</label>
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
