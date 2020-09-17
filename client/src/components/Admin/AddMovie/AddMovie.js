import React, { useEffect, useState } from 'react';

import classes from './AddMovie.module.css';
import axios from 'axios';

class Film {
    title;
    director;
    duration;
    genre;
    classification;
    release;
    showtimes;
    poster;
    // snap;
    synopsis;
}

const AddMovie = () => {
    const [Day, setDay] = useState('');
    const [Hour, setHour] = useState('');
    const [showtimesArray, setShowtimesArray] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        duration: '',
        genre: 'Comédie',
        classification: 'Tous publics',
        release: '',
        showtimes: [],
        poster: '',
        // snap: '',
        synopsis: '',
    });

    useEffect(() => {
        setFormData({ ...formData, showtimes: showtimesArray });
    }, [showtimesArray]);

    const {
        title,
        director,
        duration,
        genre,
        classification,
        release,
        showtimes,
        poster,
        // snap,
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
        setFormData({ ...formData, showtimes: showtimesArray });
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
        setFormData({ ...formData, showtimes: showtimesArray });
        setDay('');
        setHour('');
    };

    const onPosterChange = e => {
        const newPoster = e.target.files[0];
        // const newPoster = e.target.value;
        setFormData({ ...formData, poster: newPoster });
    };

    // const onSnapChange = e => {
    //     const newSnap = e.target.files[0];
    //     setFormData({ ...formData, snap: newSnap });
    // };

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
            newFilm.duration = duration;
            newFilm.genre = genre;
            newFilm.classification = classification;
            newFilm.release = release;
            newFilm.showtimes = showtimes;
            newFilm.poster = '';
            // newFilm.snap,
            newFilm.synopsis = synopsis;

            const createNewFilmWithFile = async (film, image) => {
                const formData = new FormData();
                formData.append('film', JSON.stringify(film));
                formData.append('image', image, film.title);
                const res = await axios.post('/api/films', formData, config);
                console.log(res.data);
                return res.data;
            };

            createNewFilmWithFile(newFilm, poster);

            // const newFilm = {
            //     title,
            //     director,
            //     duration,
            //     genre,
            //     classification,
            //     release,
            //     showtimes,
            //     poster,
            //     // snap,
            //     synopsis,
            // };

            // Object.entries(newFilm).forEach(film => {
            //     formData.append(`${film[0]}`, film[1]);
            // });

            // const body = JSON.stringify(newFilm);

            // await axios.post('/api/films', formData, config);
        } catch (error) {
            // if (error.response.data) {
            //     return console.log(error.response.data);
            // }
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
                        <option value='Romantique'>Romantique</option>
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
                    <p className={classes.addShowtimes}>Ajouter une séance *</p>
                    <div className={classes.showtimesInputs}>
                        <div>
                            <label htmlFor='date'>Date *</label>
                            <input
                                type='date'
                                id='date'
                                value={Day}
                                name='showtimes'
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
                        accept='.jpeg,.jpg,.png'
                        id='poster'
                        name='image'
                        required
                        onChange={e => onPosterChange(e)}
                    ></input>
                </div>
                {/* <div className={classes.field}>
                    <label htmlFor='snap'>Image extraite du film *</label>
                    <input
                        type='file'
                        accept='.jpeg,.jpg,.png'
                        id='snap'
                        name='image'
                        required
                        onChange={e => onSnapChange(e)}
                    ></input>
                </div> */}

                <input type='submit' className={classes.submit} value='Continuer'></input>
            </form>
        </div>
    );
};

export default AddMovie;
