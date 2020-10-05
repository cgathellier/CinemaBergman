import React from 'react';
import classes from './Seat.module.css';

const Seat = props => {
    const seatStyle = props.status;
    const handleClick = () => {
        props.handleClick(props.seatID);
    };
    return <div className={[classes[seatStyle], classes.seat].join(' ')} onClick={() => handleClick()}></div>;
};

export default Seat;
