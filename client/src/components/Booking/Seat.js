import React from 'react';

const Seat = props => {
    const seatStyle = props.status;
    const handleClick = () => {
        props.handleClick(props.seatID);
    };
    return <div className={`${seatStyle} seat`} onClick={() => handleClick()}></div>;
};

export default Seat;
