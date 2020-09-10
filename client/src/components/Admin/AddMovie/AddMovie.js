import React, { useState } from 'react';

import classes from './AddMovie.module.css';

function AddMovie() {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        duration: '',
        genre: '',
        classification: '',
        onScreenDate: '',
        showtimes: [],
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
        onScreenDate,
        showtimes,
        poster,
        snap,
        synopsis,
    } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
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
                    <input
                        type='date'
                        placeholder='Date de sortie *'
                        value={onScreenDate}
                        name='onScreenDate'
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
                    <input
                        type='datetime-local'
                        placeholder='Séances *'
                        value={showtimes}
                        name='showtimes'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <label for='poster'>Affiche du film</label>
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
                    <label for='snap'>Image extraite du film</label>
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
