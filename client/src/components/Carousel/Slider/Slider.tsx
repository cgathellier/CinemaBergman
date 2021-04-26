import * as React from 'react';

interface ISliderProps {
	width: number;
	translate: number;
	transition: number;
	children: React.ReactElement[];
}

const Slider = ({
	width,
	translate,
	transition,
	children,
}: ISliderProps): JSX.Element => (
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
