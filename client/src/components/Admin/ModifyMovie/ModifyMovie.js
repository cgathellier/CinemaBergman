import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import history from '../../../history';
import FilmsList from '../../FilmsList/FilmsList';
import Showtime from '../../Showtime/Showtime';
import classes from './ModifyMovie.module.css';

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

const ModifyMovie = () => {
    const [filmsList, setFilmsList] = useState([]);
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [showtimes, setShowtimes] = useState([]);
    const [filmInfos, setFilmInfos] = useState({
        _id: '',
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
        _id,
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
    } = filmInfos;

    const url = window.location.href;
    const key = '/modifymovie/';

    const getShowtimes = async () => {
        if (url.includes(key)) {
            const filmID = url.split(key)[1];
            const res = await axios.get(`/api/showtimes/${filmID}`);
            await setShowtimes(res.data);
        }
    };

    const showtimesElt = showtimes.map((st, index) => {
        const { day, hour, _id } = st;
        return (
            <Showtime key={index} id={_id} onClickCross={e => onClickCross(e)}>
                <div>{day}</div>
                <div>{hour}</div>
            </Showtime>
        );
    });

    useEffect(() => {
        window.scroll(0, 0);
        const getData = async () => {
            const res = await axios.get('/api/films');
            await setFilmsList(res.data);
        };
        getData();
    }, []);

    useEffect(() => {
        getShowtimes();
    }, [filmInfos])

    useEffect(() => {
        window.scroll(0, 0);
        const getData = async () => {
            if (url.includes(key)) {
                const filmID = url.split(key)[1];
                const res = await axios.get(`/api/films/${filmID}`);
                await setFilmInfos(res.data);
            }
        };
        getData();
    }, [window.location.href]);

    const onClickCross = async id => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'x-auth-token': token,
            },
        };
        await axios.delete(`/api/bookings/${id}`, config);
        await axios.delete(`/api/showtimes/${id}`, config);
        getShowtimes();
    };

    const onChange = e => {
        setFilmInfos({ ...filmInfos, [e.target.name]: e.target.value });
    };

    const onDayChange = e => {
        setDay(e.target.value);
    };

    const onHourChange = e => {
        setHour(e.target.value);
    };

    const addShowtime = async () => {
        if (!day || !hour) {
            return alert('Les champs pour ajouter une séance ne sont pas tous remplis');
        }

        if (url.includes(key)) {
            const filmID = url.split(key)[1];

            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            const newShowtime = {
                day,
                hour,
                film: filmID,
            };
            const res = await axios.post(`/api/showtimes/${filmID}`, newShowtime, config);
            if (res.status === 201) {
                setDay('');
                setHour('');
                getShowtimes();
            }
        }
    };

    const onPosterChange = e => {
        const newPoster = e.target.files[0];
        setFilmInfos({ ...filmInfos, poster: newPoster });
    };

    const onSnapChange = e => {
        const newSnap = e.target.files[0];
        setFilmInfos({ ...filmInfos, snap: newSnap });
    };

    const onSubmit = e => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token,
                },
            };

            const newFilm = new Film();
            newFilm._id = _id;
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

            const modifyFilmWithFile = async (film, poster, snap) => {
                let formData;
                if (typeof poster === 'string' && typeof snap === 'string') {
                    film.poster = poster;
                    film.snap = snap;
                    formData = film;
                    config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': token,
                        },
                    };
                } else if (typeof poster === 'string' && typeof snap === 'object') {
                    film.poster = poster;
                    formData = new FormData();
                    formData.append('film', JSON.stringify(film));
                    formData.append('snap', snap);
                } else if (typeof poster === 'object' && typeof snap === 'string') {
                    film.snap = snap;
                    formData = new FormData();
                    formData.append('film', JSON.stringify(film));
                    formData.append('poster', poster);
                } else {
                    formData = new FormData();
                    formData.append('film', JSON.stringify(film));
                    formData.append('poster', poster);
                    formData.append('snap', snap);
                }

                const res = await axios.put(`/api/films/${film._id}`, formData, config);
                if (res.status === 200) {
                    // document.location.reload();
                    window.scroll(0, 0);
                }
                return res.data;
            };

            modifyFilmWithFile(newFilm, poster, snap);
        } catch (error) {
            console.log(error);
        }
    };

    const onDelete = async e => {
        e.preventDefault();

        let token = localStorage.getItem('token');
        let config = {
            headers: {
                'x-auth-token': token,
            },
        };
        const deleteFilm = async () => {
            const deleteST = await axios.delete(`/api/showtimes/${_id}`, config);
            console.log(deleteST.data);
            const res = await axios.delete(`/api/films/${_id}`, config);
            return res.data;
        };
        await deleteFilm();
        await history.replace('/admin/modifymovie');
        await document.location.reload();
    };

    return (
        <div className={classes.container}>
            <Route
                path='/admin/modifymovie'
                exact
                render={() => <FilmsList filmsList={filmsList} path='/admin/modifymovie/' />}
            />
            <Route path='/admin/modifymovie/:id'>
                <div>
                    <form className={classes.field}>
                        <p className={classes.addShowtimes}>Ajouter une séance *</p>
                        <div className={classes.showtimesInputs}>
                            <div>
                                <label htmlFor='date'>Date *</label>
                                <input
                                    type='date'
                                    id='date'
                                    value={day}
                                    name='showtimes'
                                    onChange={e => onDayChange(e)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor='hour'>Heure *</label>
                                <input
                                    type='time'
                                    id='hour'
                                    value={hour}
                                    name='showtimes'
                                    onChange={e => onHourChange(e)}
                                ></input>
                            </div>
                        </div>
                        <div className={classes.submitSchedule} onClick={() => addShowtime()}>
                            Ajouter la séance
                        </div>
                        <div className={classes.st_list}>{showtimesElt}</div>
                    </form>
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
                                // value={release}
                                name='release'
                                // required
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
                                onChange={e => onSnapChange(e)}
                            ></input>
                        </div>

                        <input
                            type='submit'
                            className={classes.submit}
                            value='Enregistrer les modifications'
                        ></input>
                    </form>
                    <div className={classes.deleteCtn}>
                        <div className={classes.delete} onClick={e => onDelete(e)}>
                            Supprimer
                        </div>
                    </div>
                </div>
            </Route>
        </div>
    );
};

export default ModifyMovie;
