import * as React from 'react';
import Row from '../../components/Booking/Row';
import axios from 'axios';
import Seat from '../../components/Booking/Seat';
import history from '../../history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from '../../components/AuthModal/AuthModal';
import { configJson } from '../../utils/axiosConfigs';

export const LayoutBooking = ({ name }) => {
	const [selectedSeats, setSelectedSeats] = React.useState([]);
	const [bookedSeats, setBookedSeats] = React.useState([]);

	const showtimeID = window.location.href.split('/booking/')[1];

	React.useEffect(() => {
		const getBookedSeats = async () => {
			const res = await axios.get(`/api/bookings/${showtimeID}`);
			for (let i = 0; i < res.data.length; i++) {
				const bookedArray = res.data[i].selectedSeats;
				bookedArray.forEach(seat =>
					setBookedSeats(bookedSeats => [...bookedSeats, seat])
				);
			}
		};
		getBookedSeats();
	}, [showtimeID]);

	const handleClick = seatID => {
		if (bookedSeats.indexOf(seatID) !== -1) {
			return;
		} else if (selectedSeats.indexOf(seatID) !== -1) {
			const selectedFilter = selectedSeats.filter(seat => seat !== seatID);
			return setSelectedSeats(selectedFilter);
		}
		setSelectedSeats(selectedSeats => [...selectedSeats, seatID]);
	};

	const handleSubmit = async () => {
		const body = {
			selectedSeats: selectedSeats,
		};
		await axios.post(`/api/bookings/${showtimeID}`, body, configJson);
		history.push('/reservations');
	};

	const colsNames = ['A', 'B', 'C', 'D', 'E', 'F'];

	return (
		<div className='Booking__layout'>
			{name ? (
				<div className='Booking__container'>
					<div className='Booking__legend'>
						<div>
							<Seat status='free' seatID='' handleClick={() => {}} />
							<span>Places libres</span>
						</div>
						<div>
							<Seat
								status='selectedLegend'
								seatID=''
								handleClick={() => {}}
							/>
							<span>Mes places</span>
						</div>
						<div>
							<Seat
								status='bookedLegend'
								seatID=''
								handleClick={() => {}}
							/>
							<span>Places occupées</span>
						</div>
					</div>
					<div className='Booking__screenContainer'>
						<div className='Booking__screen'></div>
					</div>
					{colsNames.map(letter => {
						return (
							<Row
								key={letter}
								cols='10'
								name={letter}
								handleClick={handleClick}
								selected={selectedSeats}
								booked={bookedSeats}
							/>
						);
					})}
					<div className='Booking__validation' onClick={handleSubmit}>
						Poursuivre
					</div>
				</div>
			) : (
				<AuthModal text='Veuillez vous connecter pour réserver vos places' />
			)}
		</div>
	);
};

LayoutBooking.propTypes = {
	name: PropTypes.string,
};

const mapStateToProps = state => ({
	name: state.auth.name,
});

export default connect(mapStateToProps)(LayoutBooking);
