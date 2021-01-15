import * as React from 'react';

const Seat = ({ status, seatID, handleClick }) => {
	return <div className={`${status} seat`} onClick={() => handleClick(seatID)}></div>;
};

export default Seat;
