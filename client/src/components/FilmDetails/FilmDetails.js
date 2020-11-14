import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Post from '../Post/Post';
import Nav from '../Showtime/Nav';
import Showtime from '../Showtime/Showtime';
import classes from './FilmDetails.module.css';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from '../AuthModal/AuthModal';

const JOURS = {
    0: 'DIM.',
    1: 'LUN.',
    2: 'MAR.',
    3: 'MER.',
    4: 'JEU.',
    5: 'VEN.',
    6: 'SAM.',
};

const MOIS = {
    0: 'JAN.',
    1: 'FEV.',
    2: 'MARS',
    3: 'AVR.',
    4: 'MAI',
    5: 'JUIN',
    6: 'JUI.',
    7: 'AOUT',
    8: 'SEP.',
    9: 'OCT.',
    10: 'NOV.',
    11: 'DEC.',
};

const MOIS_FULL = {
    0: 'janvier',
    1: 'février',
    2: 'mars',
    3: 'avril',
    4: 'mai',
    5: 'juin',
    6: 'juillet',
    7: 'août',
    8: 'septembre',
    9: 'octobre',
    10: 'novembre',
    11: 'décembre',
};

const FilmDetails = ({ name }) => {
    const [filmData, setFilmData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState({
        title: '',
        text: '',
    });
    const [nav, setNav] = useState([]);
    const [selectedNav, setSelectedNav] = useState();
    const [showtimes, setShowtimes] = useState([]);
    const [stDisplayed, setStDisplayed] = useState([]);
    const [releaseDate, setReleaseDate] = useState();

    const filmUrl = window.location.href;
    const filmId = filmUrl.split('/films/')[1];

    const getData = async () => {
        const getFilms = await axios.get(`/api/films/${filmId}`);
        await setFilmData(getFilms.data);
        await formatRelease(getFilms.data);
        const getPosts = await axios.get(`/api/posts/${filmId}`);
        setPosts(getPosts.data);
    };

    const setNavDates = () => {
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date();
            const nextDate = currentDate.getDate() + i;
            currentDate.setDate(nextDate);
            setNav(nav => [...nav, currentDate]);
        }
    };

    const getST = async () => {
        const res = await axios.get(`/api/showtimes/${filmId}`);
        setShowtimes(res.data);
    };

    const formatRelease = data => {
        const date = data.release;
        const releaseMonthNumber = new Date(date).getMonth();
        const releaseMonth = MOIS_FULL[releaseMonthNumber];
        const display = (
            <Fragment>
                {' '}
                <Moment format='DD'>{date}</Moment> {releaseMonth}{' '}
                <Moment format='YYYY'>{date}</Moment>
            </Fragment>
        );
        setReleaseDate(display);
    };

    useEffect(() => {
        window.scroll(0, 0);
        const execution = async () => {
            await getData();
            await setNavDates();
            await getST();
            setSelectedNav(0);
        };
        execution();
    }, []);

    useEffect(() => {
        if (!nav.length > 0) {
            return;
        }
        const dateSelected = nav[selectedNav];
        const navDate = new Date(dateSelected).getDate();
        const navMonth = new Date(dateSelected).getMonth();
        const filterFunction = st => {
            const showDate = new Date(st.day).getDate();
            const showMonth = new Date(st.day).getMonth();
            if (showDate === navDate && showMonth === navMonth) {
                return st;
            }
        };
        const filteredST = showtimes.filter(filterFunction);
        const array = filteredST
            .sort((a, b) => {
                const first = a.day + 'T' + a.hour + ':00';
                const second = b.day + 'T' + b.hour + ':00';
                const firstTime = new Date(first).getTime();
                const secondTime = new Date(second).getTime();
                return firstTime - secondTime;
            })
            .map((st, index) => {
                const { hour, _id } = st;
                return (
                    <Showtime key={index} id={_id}>
                        {hour}
                    </Showtime>
                );
            });
        setStDisplayed(array);
    }, [nav, selectedNav]);

    const handleClick = async postId => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'x-auth-token': token,
            },
        };
        await axios.delete(`/api/posts/${postId}`, config);
        getData();
    };

    const handleChange = e => {
        setPostContent({ ...postContent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
            };

            const newPost = {
                title: postContent.title,
                text: postContent.text,
            };

            const res = await axios.post(`/api/posts/${filmId}`, newPost, config);
            if (res.status === 201) {
                document.location.reload();
                window.scroll(0, 0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNavClick = index => {
        setSelectedNav(index);
    };

    let postsElt = posts
        .sort((a, b) => a.date - b.date)
        .map((post, index) => {
            return <Post key={index} post={post} onClick={handleClick} />;
        });

    const displayPosts =
        postsElt.length > 0 ? <div className={classes.postsElt}>{postsElt}</div> : '';

    const postForm = name ? (
        <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <input
                type='text'
                className={classes.postTitle}
                placeholder='Titre du commentaire'
                name='title'
                onChange={e => handleChange(e)}
                value={postContent.title}
                maxLength={40}
            />
            <textarea
                type='textarea'
                className={classes.textarea}
                placeholder='Commentaire'
                name='text'
                onChange={e => handleChange(e)}
                value={postContent.text}
            ></textarea>
            <input type='submit' className={classes.submit} value='Ajouter un commentaire' />
        </form>
    ) : (
        <AuthModal text='Veuillez vous connecter pour poster un commentaire' />
    );

    const showtimeNav = nav.map((navDate, index) => {
        const day = navDate.getDay();
        const date = navDate.getDate();
        const month = navDate.getMonth();
        return (
            <Nav
                day={JOURS[day]}
                date={date < 10 ? '0' + date : date}
                month={MOIS[month]}
                index={index}
                selected={index === selectedNav ? 'true' : 'false'}
                handleClick={e => handleNavClick(e)}
                key={navDate}
            />
        );
    });

    return (
        <Fragment>
            <div className={classes.Container}>
                <img src={filmData.snap} alt={filmData.title} className={classes.Instant} />
                <div className={classes.grad}>
                    <div>
                        <p className={classes.Title}>{filmData.title}</p>
                        <p className={classes.GenreDuration}>
                            {filmData.genre} ({filmData.duration})
                            <span className={classes.PublicBtn}>{filmData.classification}</span>
                        </p>
                        <a className={classes.SeancesBtn} href='#showtimes'>
                            <i className='far fa-clock'></i> Séances
                        </a>
                    </div>
                    <div>
                        <div className={classes.Presentation}>
                            <div className={classes.imgContainer}>
                                <img
                                    src={filmData.poster}
                                    alt={filmData.title}
                                    className={classes.Poster}
                                />
                            </div>
                            <div className={classes.Infos}>
                                <p>
                                    Sortie :<span>{releaseDate}</span>
                                </p>
                                <p>
                                    Réalisé par <span>{filmData.director}</span>
                                </p>
                                <p>Avec {filmData.actors}</p>
                            </div>
                        </div>
                        <div className={classes.Synopsis}>{filmData.synopsis}</div>
                    </div>
                </div>
            </div>
            <div className={classes.StPostsCtn}>
                <div className={classes.showtimesCtn} id='showtimes'>
                    <div className={classes.showtimes}>Séances</div>
                    <div className={classes.showtimesNavCtn}>{showtimeNav}</div>
                    <div className={classes.showtimesEltCtn}>{stDisplayed}</div>
                </div>
                <div className={classes.postsContainer}>
                    {displayPosts}
                    <div className={classes.formContainer}>{postForm}</div>
                </div>
            </div>
        </Fragment>
    );
};

FilmDetails.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = state => ({
    name: state.auth.name,
});

export default connect(mapStateToProps)(FilmDetails);
