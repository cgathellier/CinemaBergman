import React, { Fragment, useEffect, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import axios from 'axios';

import LayoutHome from './Layouts/LayoutHome/LayoutHome';
import LayoutFilms from './Layouts/LayoutFilms/LayoutFilms';
import LayoutBooking from './Layouts/LayoutBooking/LayoutBooking';
import LayoutRegAuth from './Layouts/LayoutRegAuth/LayoutRegAuth';
import Toolbar from '../components/Toolbar/Toolbar';
import history from '../history';
import AdminPanel from './Layouts/AdminPanel/AdminPanel';
import FilmDetails from '../components/FilmDetails/FilmDetails';

const Main = () => {
    const [filmsList, setFilmList] = useState([]);
    const [posterClicked, setPosterClicked] = useState(null);

    useEffect(() => {
        window.scroll(0, 0);
        const getData = async () => {
            const res = await axios.get('/api/films');
            setFilmList(res.data);
        };
        getData();
    }, []);

    const handlePosterClick = film => {
        setPosterClicked(film);
    };

    return (
        <Fragment>
            <Router history={history}>
                <Toolbar />
                <Route
                    path='/'
                    exact
                    render={() => <LayoutHome filmsList={filmsList} onClickPoster={handlePosterClick} />}
                />
                <Route
                    path='/films'
                    render={props => (
                        <LayoutFilms filmsList={filmsList} posterClicked={posterClicked} {...props} />
                    )}
                />

                <Route
                    path='/films/:title'
                    render={props => <FilmDetails filmInfos={posterClicked} {...props} />}
                />
                <Route path='/reservation' component={LayoutBooking} />
                <Route path='/register' render={() => <LayoutRegAuth regOrAuth='register' />} />
                <Route path='/login' render={() => <LayoutRegAuth regOrAuth='login' />} />
                <Route path='/admin' render={() => <AdminPanel />} />
            </Router>
        </Fragment>
    );
};

export default Main;
