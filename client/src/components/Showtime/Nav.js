import * as React from 'react';

const Nav = ({ selected, day, date, month, handleClick, index }) => (
	<div
		className={selected === 'true' ? 'nav__selectedContainer' : 'nav__container'}
		onClick={() => handleClick(index)}
	>
		<div className='nav__day'>{day}</div>
		<div className='nav__date'>{date}</div>
		<div className='nav__month'>{month}</div>
	</div>
);

export default Nav;
