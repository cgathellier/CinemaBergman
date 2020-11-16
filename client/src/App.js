import React, { Fragment, useEffect, useState } from 'react';
import './prefixed/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Router } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import Toolbar from './components/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import Films from './containers/Films/Films';
import Booking from './containers/Booking/Booking';
import RegAuth from './containers/RegAuth/RegAuth';
import AdminPanel from './containers/AdminPanel/AdminPanel';
import Tickets from './containers/Tickets/Tickets';
import FilmDetails from './components/FilmDetails/FilmDetails';
import history from './history';
import store from './store';
import Alert from './components/Alert/Alert';
import LogoutModal from './components/LogoutModal/LogoutModal';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
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
        <BrowserRouter>
            <Fragment>
                <Provider store={store}>
                    <Router history={history}>
                        <Toolbar />
                        <div className='App__background'>
                            <Alert />
                            <LogoutModal />
                            <div className='App__bodyCtn'>
                                <Route
                                    path='/'
                                    exact
                                    render={() => <Home filmsList={filmsList} />}
                                />
                                <Route
                                    path='/films'
                                    exact
                                    render={props => <Films filmsList={filmsList} {...props} />}
                                />
                                <Route
                                    path='/films/:id'
                                    render={props => <FilmDetails {...props} />}
                                />

                                <Route path='/reservations' render={() => <Tickets />} />
                            </div>
                            <Route path='/admin' render={() => <AdminPanel />} />
                            <Route path='/booking' component={Booking} />
                            <Route
                                path='/register'
                                render={() => <RegAuth regOrAuth='register' />}
                            />
                            <Route path='/login' render={() => <RegAuth regOrAuth='login' />} />
                        </div>
                    </Router>
                </Provider>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;
