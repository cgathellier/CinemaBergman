import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import FilmsList from '../../FilmsList/FilmsList';
import Form from '../Form/Form';
import classes from './ModifyMovie.module.css';

class Film {
    title;
    director;
    actors;
    duration;
    genre;
    classification;
    release;
    showtimes;
    poster;
    snap;
    synopsis;
    coucou;
}

const ModifyMovie = () => {
    const [filmsList, setFilmsList] = useState([]);
    const [posterClicked, setPosterClicked] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        actors: '',
        duration: '',
        genre: 'Comédie',
        classification: 'Tous publics',
        release: '',
        showtimes: [],
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
        showtimes,
        poster,
        snap,
        synopsis,
    } = posterClicked;

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('/api/films');
            await setFilmsList(res.data);
        };
        getData();
    }, []);

    const handleClickPoster = async filmInfos => {
        await setPosterClicked(filmInfos);
    };

    const onChange = (field, data) => {
        setFormData({ ...formData, [field]: data });
    };

    const onPosterChange = posterURL => {
        setFormData({ ...formData, poster: posterURL });
    };

    const addShowtime = showtime => {
        setFormData({ ...formData, showtimes: showtime });
    };

    const onSnapChange = snapURL => {
        setFormData({ ...formData, snap: snapURL });
    };

    const onSubmit = e => {
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
            newFilm.showtimes = showtimes;
            newFilm.poster = '';
            newFilm.snap = '';
            newFilm.synopsis = synopsis;

            const createNewFilmWithFile = async (film, poster, snap) => {
                const formData = new FormData();
                formData.append('film', JSON.stringify(film));
                formData.append('poster', poster, film.title);
                formData.append('snap', snap, film.title);
                const res = await axios.post('/api/films', formData, config);
                if (res.status === 201) {
                    document.location.reload();
                    window.scroll(0, 0);
                }
                return res.data;
            };

            createNewFilmWithFile(newFilm, poster, snap);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.container}>
            <Route
                path='/admin/modifymovie'
                exact
                render={() => (
                    <FilmsList
                        filmsList={filmsList}
                        onClickPoster={handleClickPoster}
                        path='/admin/modifymovie/'
                    />
                )}
            />
            <Route
                path='/admin/modifymovie/:id'
                render={() => (
                    <Form
                        required='false'
                        onChange={onChange}
                        addShowtime={addShowtime}
                        onPosterChange={onPosterChange}
                        onSnapChange={onSnapChange}
                        onSubmit={onSubmit}
                        formData={posterClicked}
                    />
                )}
            />
        </div>
    );
};

export default ModifyMovie;
