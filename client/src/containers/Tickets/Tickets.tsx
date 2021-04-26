import * as React from 'react';
import axios from 'axios';
import Tickets from '../../components/Tickets/Tickets';
import { connect } from 'react-redux';
import AuthModal from '../../components/AuthModal/AuthModal';
import { configToken } from '../../utils/axiosConfigs';
import { IBookings, IFilm, IReduxState, IShowtime } from '../../utils/Interfaces';

interface ILayoutTicketsProps {
	name: string | null;
}

type TBookingData = {
	showtime: IShowtime;
	film: IFilm;
};

export const LayoutTickets = ({ name }: ILayoutTicketsProps) => {
	const [bookings, setBookings] = React.useState<IBookings[]>([]);
	const [data, setData] = React.useState<TBookingData[]>([]);

	const getTickets = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			const getUserId = await axios.get('/api/auth', configToken);
			const bookingList = await axios.get(
				`/api/bookings/user/${getUserId.data._id}`,
				configToken
			);
			setBookings(bookingList.data);

			const getData: TBookingData[] = await Promise.all(
				bookingList.data.map(async (booking: IBookings) => {
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
		// window.scroll(0, 0);
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

const mapStateToProps = (state: IReduxState) => ({
	name: state.auth.name,
});

export default connect(mapStateToProps)(LayoutTickets);
