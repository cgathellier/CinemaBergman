import * as React from 'react';

interface INavProps {
	selected: boolean;
	day: string;
	date: string;
	month: string;
	index: number;
	handleClick: (index: number) => void;
}

const Nav = ({ selected, day, date, month, handleClick, index }: INavProps) => (
	<div
		className={selected ? 'nav__selectedContainer' : 'nav__container'}
		onClick={() => handleClick(index)}
		data-testid='navClick'
	>
		<div className='nav__day'>{day}</div>
		<div className='nav__date'>{date}</div>
		<div className='nav__month'>{month}</div>
	</div>
);

export default Nav;
