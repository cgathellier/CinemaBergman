import React, { Fragment, useEffect, useState } from 'react';
import { Route, Router } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import Toolbar from '../components/Toolbar/Toolbar';
import LayoutHome from './Layouts/LayoutHome/LayoutHome';
import LayoutFilms from './Layouts/LayoutFilms/LayoutFilms';
import LayoutBooking from './Layouts/LayoutBooking/LayoutBooking';
import LayoutRegAuth from './Layouts/LayoutRegAuth/LayoutRegAuth';
import AdminPanel from './Layouts/AdminPanel/AdminPanel';
import LayoutTickets from './Layouts/LayoutTickets/LayoutTickets';
import FilmDetails from '../components/FilmDetails/FilmDetails';
import history from '../history';
import store from '../store';
import classes from './Main.module.css';
import Alert from '../components/Alert/Alert';
import Modal from '../components/Modal/Modal';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const Main = () => {
    const [filmsList, setFilmList] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
        getData();
        store.dispatch(loadUser());
    }, []);

    const getData = async () => {
        const res = await axios.get('/api/films');
        await setFilmList(res.data);
    };

    return (
        <Fragment>
            <Provider store={store}>
                <Router history={history}>
                    <Toolbar />
                    <div className={classes.background}>
                        <Alert />
                        <Modal />
                        <div className={classes.bodyCtn}>
                            <Route
                                path='/'
                                exact
                                render={() => <LayoutHome filmsList={filmsList} />}
                            />
                            <Route
                                path='/films'
                                exact
                                render={props => <LayoutFilms filmsList={filmsList} {...props} />}
                            />
                            <Route path='/films/:id' render={props => <FilmDetails {...props} />} />

                            <Route path='/reservations' render={() => <LayoutTickets />} />
                        </div>
                        <Route path='/admin' render={() => <AdminPanel />} />
                        <Route path='/booking' component={LayoutBooking} />
                        <Route
                            path='/register'
                            render={() => <LayoutRegAuth regOrAuth='register' />}
                        />
                        <Route path='/login' render={() => <LayoutRegAuth regOrAuth='login' />} />
                    </div>
                </Router>
            </Provider>
        </Fragment>
    );
};

export default Main;
