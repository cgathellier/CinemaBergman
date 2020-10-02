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

const NameContext = React.createContext();
const IsAdminContext = React.createContext();

const Main = () => {
    const [filmsList, setFilmList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        window.scroll(0, 0);
        getData();
        logUser();
    }, []);

    const getData = async () => {
        const res = await axios.get('/api/films');
        await setFilmList(res.data);
    };

    const logUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    'x-auth-token': token,
                },
            };
            const res = await axios.get('/api/auth', config);
            setIsAdmin(res.data.isAdmin);
            setUsername(res.data.name);
            if (res.status === 200) {
            }
        }
    };

    const getUsername = username => {
        setUsername(username);
    };

    const getIsAdmin = isAdmin => {
        setIsAdmin(isAdmin);
    };

    return (
        <Fragment>
            <Router history={history}>
                <NameContext.Provider value={username}>
                    <IsAdminContext.Provider value={isAdmin}>
                        <Toolbar />
                        <Route path='/' exact render={() => <LayoutHome filmsList={filmsList} />} />
                        <Route
                            path='/films'
                            render={props => <LayoutFilms filmsList={filmsList} {...props} />}
                        />

                        <Route path='/films/:id' render={props => <FilmDetails {...props} />} />
                        <Route path='/booking' component={LayoutBooking} />
                        <Route
                            path='/register'
                            render={() => (
                                <LayoutRegAuth
                                    regOrAuth='register'
                                    getUsername={getUsername}
                                    getIsAdmin={getIsAdmin}
                                />
                            )}
                        />
                        <Route
                            path='/login'
                            render={() => (
                                <LayoutRegAuth
                                    regOrAuth='login'
                                    getUsername={getUsername}
                                    getIsAdmin={getIsAdmin}
                                />
                            )}
                        />
                        <Route path='/admin' render={() => <AdminPanel />} />
                    </IsAdminContext.Provider>
                </NameContext.Provider>
            </Router>
        </Fragment>
    );
};

export { Main, NameContext, IsAdminContext };
