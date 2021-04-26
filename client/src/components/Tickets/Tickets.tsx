import * as React from 'react';
import Moment from 'react-moment';
import { IBookings, IFilm, IShowtime } from '../../utils/Interfaces';
import { TDate } from '../../utils/Types';

const MOIS: TDate = {
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

const JOURS: TDate = {
	0: 'dimanche',
	1: 'lundi',
	2: 'mardi',
	3: 'mercredi',
	4: 'jeudi',
	5: 'vendredi',
	6: 'samedi',
};

interface ITicketsProps {
	showtime: IShowtime;
	film: IFilm;
	bookings: IBookings;
}

const Tickets = ({ showtime, film, bookings }: ITicketsProps) => (
	<div className='ticket__container'>
		<div className='ticket__imgContainer'>
			<img src={film.poster} alt={film.title} />
		</div>
		<div className='ticket__infos'>
			<div className='ticket__title'>{film.title}</div>
			<div className='ticket__date'>
				Séance du {JOURS[new Date(showtime.day).getDay()]}{' '}
				<Moment format='DD'>{showtime.day}</Moment>{' '}
				{MOIS[new Date(showtime.day).getMonth()]}{' '}
				<Moment format='YYYY'>{showtime.day}</Moment> à {showtime.hour}
			</div>
			<div className='ticket__seats'>
				Sièges : {bookings.selectedSeats.join(', ')}
			</div>
		</div>
	</div>
);

export default Tickets;
