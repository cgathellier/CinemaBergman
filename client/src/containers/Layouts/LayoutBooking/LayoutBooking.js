import { TokenExpiredError } from 'jsonwebtoken';
import React, { useState } from 'react';
import Row from '../../../components/Booking/Row';
import classes from './LayoutBooking.module.css';
import axios from 'axios';

const LayoutBooking = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleClick = seatID => {
        if (selectedSeats.indexOf(seatID) !== -1) {
            const selectedFilter = selectedSeats.filter(seat => seat !== seatID);
            return setSelectedSeats(selectedFilter);
        }
        setSelectedSeats(selectedSeats => [...selectedSeats, seatID]);
    };

    const handleSubmit = () => {
        const showtimeID = window.location.href.split('/booking/')[1];
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': token,
            },
        };
        const body = {
            selectedSeats: selectedSeats,
        };
        const req = axios.post(`/api/bookings/${showtimeID}`, body, config);
    };

    const colsNames = ['A', 'B', 'C', 'D', 'E', 'F'];

    const rows = colsNames.map(letter => {
        return (
            <Row key={letter} cols='10' name={letter} handleClick={handleClick} selected={selectedSeats} />
        );
    });

    return (
        <div className={classes.layoutContainer}>
            <div className={classes.container}>
                <div className={classes.screenContainer}>
                    <div className={classes.screen}></div>
                </div>
                {rows}
                <div className={classes.validation} onClick={handleSubmit}>
                    Poursuivre
                </div>
            </div>
        </div>
    );
};

export default LayoutBooking;
