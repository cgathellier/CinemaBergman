import React from 'react';
import Seat from './Seat';
import classes from './Row.module.css';

const Row = props => {
    const handleClick = seatID => {
        props.handleClick(seatID);
    };
    const seats = [];
    const selectedSeats = props.selected;
    for (let i = 0; i < props.cols; i++) {
        const seatID = props.name + (i + 1);
        const status = selectedSeats.indexOf(seatID) !== -1 ? 'selected' : '';
        const seat = <Seat status={status} key={i} seatID={seatID} handleClick={handleClick} />;
        seats.push(seat);
    }
    return <div className={classes.rowContainer}>{seats}</div>;
};

export default Row;
