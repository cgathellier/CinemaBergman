import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface IShowtimeProps {
	deleteShowtime?: (id: string) => void;
	children: string | React.ReactElement[];
	id: string;
}

const Showtime = ({ deleteShowtime, children, id }: IShowtimeProps) =>
	deleteShowtime ? (
		<div className='showtime__container'>
			{children}
			<div
				className='showtime__crossContainer'
				onClick={() => deleteShowtime(id)}
				data-testid='deleteIcon'
			>
				<i className='far fa-times-circle showtime__cross'></i>
			</div>
		</div>
	) : (
		<NavLink to={`/booking/${id}`}>
			<div className='showtime__container'>{children}</div>
		</NavLink>
	);

export default Showtime;
