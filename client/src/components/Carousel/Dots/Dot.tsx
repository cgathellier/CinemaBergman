import * as React from 'react';

interface IDotProps {
	selected: boolean;
}

const Dot = ({ selected }: IDotProps) => (
	<div className={selected ? 'dot--selected' : 'dot'}></div>
);

export default Dot;
