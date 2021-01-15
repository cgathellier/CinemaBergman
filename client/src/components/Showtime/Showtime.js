import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Showtime = ({ onClickCross, children, id }) =>
	onClickCross ? (
		<div className='showtime__container'>
			{children}
			<div className='showtime__crossContainer' onClick={() => onClickCross(id)}>
				<i className='far fa-times-circle showtime__cross'></i>
			</div>
		</div>
	) : (
		<NavLink to={`/booking/${id}`}>
			<div className='showtime__container'>{children}</div>
		</NavLink>
	);

export default Showtime;
