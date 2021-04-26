import * as React from 'react';

interface ISeatProps {
	status: string;
	seatID: string;
	handleClick: (seatID: string) => void;
}

const Seat = ({ status, seatID, handleClick }: ISeatProps) => {
	return (
		<div
			className={`${status} seat`}
			onClick={() => handleClick(seatID)}
			data-testid='seat'
		></div>
	);
};

export default Seat;
