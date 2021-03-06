import * as React from 'react';
import Seat from './Seat';

interface IRowProps {
	selected: string[];
	booked: string[];
	cols: number;
	name: string;
	handleClick: (seatID: string) => void;
}

const Row = ({ selected, booked, cols, name, handleClick }: IRowProps) => {
	const seats = [];
	const selectedSeats = selected;
	for (let i = 0; i < cols; i++) {
		const seatID = name + (i + 1);
		let status;
		if (selectedSeats.indexOf(seatID) !== -1) {
			status = 'selected';
		} else if (booked.indexOf(seatID) !== -1) {
			status = 'booked';
		} else {
			status = '';
		}
		const seat = (
			<Seat
				status={status}
				key={i}
				seatID={seatID}
				handleClick={() => handleClick(seatID)}
			/>
		);
		seats.push(seat);
	}
	return <div className='row__container'>{seats}</div>;
};

export default Row;
