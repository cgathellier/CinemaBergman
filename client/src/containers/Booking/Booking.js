import React, { useEffect, useState } from 'react';
import Row from '../../components/Booking/Row';
import axios from 'axios';
import Seat from '../../components/Booking/Seat';
import history from '../../history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from '../../components/AuthModal/AuthModal';

const LayoutBooking = ({ name }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    const showtimeID = window.location.href.split('/booking/')[1];

    useEffect(() => {
        const getBookedSeats = async () => {
            const res = await axios.get(`/api/bookings/${showtimeID}`);
            for (let i = 0; i < res.data.length; i++) {
                const bookedArray = res.data[i].selectedSeats;
                bookedArray.forEach(seat => setBookedSeats(bookedSeats => [...bookedSeats, seat]));
            }
        };
        getBookedSeats();
    }, []);

    const handleClick = seatID => {
        if (bookedSeats.indexOf(seatID) !== -1) {
            return;
        } else if (selectedSeats.indexOf(seatID) !== -1) {
            const selectedFilter = selectedSeats.filter(seat => seat !== seatID);
            return setSelectedSeats(selectedFilter);
        }
        setSelectedSeats(selectedSeats => [...selectedSeats, seatID]);
    };

    const handleSubmit = async () => {
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
        await axios.post(`/api/bookings/${showtimeID}`, body, config);
        history.push('/reservations');
    };

    const handleClickLegend = () => {
        return;
    };

    const colsNames = ['A', 'B', 'C', 'D', 'E', 'F'];

    const rows = colsNames.map(letter => {
        return (
            <Row
                key={letter}
                cols='10'
                name={letter}
                handleClick={handleClick}
                selected={selectedSeats}
                booked={bookedSeats}
            />
        );
    });

    const display = name ? (
        <div className='Booking__container'>
            <div className='Booking__legend'>
                <div>
                    <Seat status='free' seatID='' handleClick={handleClickLegend} />
                    <span>Places libres</span>
                </div>
                <div>
                    <Seat status='selectedLegend' seatID='' handleClick={handleClickLegend} />
                    <span>Mes places</span>
                </div>
                <div>
                    <Seat status='bookedLegend' seatID='' handleClick={handleClickLegend} />
                    <span>Places occupées</span>
                </div>
            </div>
            <div className='Booking__screenContainer'>
                <div className='Booking__screen'></div>
            </div>
            {rows}
            <div className='Booking__validation' onClick={handleSubmit}>
                Poursuivre
            </div>
        </div>
    ) : (
        <AuthModal text='Veuillez vous connecter pour réserver vos places' />
    );

    return <div className='Booking__layout'>{display}</div>;
};

LayoutBooking.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = state => ({
    name: state.auth.name,
});

export default connect(mapStateToProps)(LayoutBooking);
