import * as React from 'react';
import './prefixed/style.css';
import { Route } from 'react-router-dom';
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
import store from './store';
import Alert from './components/Alert/Alert';
import LogoutModal from './components/LogoutModal/LogoutModal';
import { loadUser } from './actions/auth';
import storeFilmList from './actions/films';
import { IFilm } from './utils/Interfaces';

interface IAppProps {
	storeFilmList?: (films: IFilm[]) => void;
}

const App = ({ storeFilmList }: IAppProps) => {
	const scrollRef = React.useRef<HTMLDivElement>(null);

	const getData = React.useCallback(async () => {
		if (storeFilmList === undefined) return;
		try {
			const res = await axios.get('/api/films');
			storeFilmList(res.data);
		} catch (error) {
			console.log(error);
		}
	}, [storeFilmList]);

	React.useEffect(() => {
		// window.scroll(0, 0);
		// scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
		getData();
		store.dispatch(loadUser());
	}, [getData]);

	return (
		<>
			<Toolbar />
			<div className='App__background' ref={scrollRef}>
				<Alert />
				<LogoutModal />
				<div className='App__bodyCtn'>
					<Route path='/' exact render={() => <Home />} />
					<Route path='/films' exact render={() => <Films />} />
					<Route path='/films/:id' render={() => <FilmDetails />} />

					<Route path='/reservations' render={() => <Tickets />} />
				</div>
				<Route path='/admin' render={() => <AdminPanel />} />
				<Route path='/booking' component={Booking} />
				<Route path='/register' render={() => <RegAuth regOrAuth='register' />} />
				<Route path='/login' render={() => <RegAuth regOrAuth='login' />} />
			</div>
		</>
	);
};

export default connect<IAppProps>(null, { storeFilmList })(App);
