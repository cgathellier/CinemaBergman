import * as React from 'react';
import './prefixed/style.css';
import { Route, Router } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
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
import storeFilmList from './actions/films';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = ({ storeFilmList }) => {
	const getData = React.useCallback(async () => {
		const res = await axios.get('/api/films');
		storeFilmList(res.data);
	}, [storeFilmList]);

	React.useEffect(() => {
		window.scroll(0, 0);
		getData();
		store.dispatch(loadUser());
	}, [getData]);

	return (
		<>
			<Router history={history}>
				<Toolbar />
				<div className='App__background'>
					<Alert />
					<LogoutModal />
					<div className='App__bodyCtn'>
						<Route path='/' exact render={() => <Home />} />
						<Route
							path='/films'
							exact
							render={props => <Films {...props} />}
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
		</>
	);
};

export default connect(null, { storeFilmList })(App);
