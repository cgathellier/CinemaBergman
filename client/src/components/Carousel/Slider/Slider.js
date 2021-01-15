import * as React from 'react';

const Slider = ({ width, translate, transition, children }) => (
	<div
		className='slider'
		style={{
			width: `${width}px`,
			transform: `translateX(-${translate}px)`,
			transition: `transform ease-in-out ${transition}s`,
		}}
	>
		{children}
	</div>
);

export default Slider;
