import * as React from 'react';

interface IArrowsProps {
	direction: string;
	display: string;
	handleClick: () => void;
}

const Arrows = ({ direction, display, handleClick }: IArrowsProps) => (
	<div
		className={`arrow arrow--${direction}`}
		style={{ display: `${display}` }}
		onClick={handleClick}
		data-testid='arrow'
	>
		<i
			className={direction === 'right' ? 'fas fa-angle-right' : 'fas fa-angle-left'}
		></i>
	</div>
);

export default Arrows;
