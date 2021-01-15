import * as React from 'react';
import axios from 'axios';
import Tickets from '../../components/Tickets/Tickets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from '../../components/AuthModal/AuthModal';
import { configToken } from '../../utils/axiosConfigs';

export const LayoutTickets = ({ name }) => {
	const [bookings, setBookings] = React.useState([]);
	const [data, setData] = React.useState([]);

	const getTickets = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			const getUserId = await axios.get('/api/auth', configToken);
			const bookingList = await axios.get(
				`/api/bookings/user/${getUserId.data._id}`,
				configToken
			);
			setBookings(bookingList.data);

			const getData = await Promise.all(
				bookingList.data.map(async booking => {
					const req = await Promise.all([
						axios.get(`/api/showtimes/showtime/${booking.showtimeID}`),
						axios.get(`/api/films/${booking.filmID}`),
					]);
					return { showtime: req[0].data, film: req[1].data };
				})
			);
			setData(getData);
		}
	};

	React.useEffect(() => {
		window.scroll(0, 0);
		getTickets();
	}, []);

	return (
		<div className='Tickets__container'>
			<div className='Tickets__title'>Vos réservations</div>
			{name ? (
				<div className='Tickets__ticketsCtn'>
					{data.map((data, index) => {
						return (
							<Tickets
								showtime={data.showtime}
								film={data.film}
								bookings={bookings[index]}
								key={index}
							/>
						);
					})}
				</div>
			) : (
				<AuthModal text='Veuillez vous connecter pour accéder à vos réservations' />
			)}
		</div>
	);
};

LayoutTickets.propTypes = {
	name: PropTypes.string,
};

const mapStateToProps = state => ({
	name: state.auth.name,
});

export default connect(mapStateToProps)(LayoutTickets);
