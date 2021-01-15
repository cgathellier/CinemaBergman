import * as React from 'react';

const Arrows = ({ direction, display, handleClick }) => (
	<div
		className={`arrow arrow--${direction}`}
		style={{ display: `${display}` }}
		onClick={handleClick}
	>
		<i
			className={direction === 'right' ? 'fas fa-angle-right' : 'fas fa-angle-left'}
		></i>
	</div>
);

export default Arrows;
