import React, { useEffect, useState } from 'react';
import classes from './Tickets.module.css';
import axios from 'axios';
import Tickets from '../../components/Tickets/Tickets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from '../../components/AuthModal/AuthModal';

const LayoutTickets = ({ name }) => {
    const [bookings, setBookings] = useState([]);

    const getTickets = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    'x-auth-token': token,
                },
            };
            const getUserId = await axios.get('/api/auth', config);
            const res = await axios.get(`/api/bookings/user/${getUserId.data._id}`, config);
            setBookings(res.data);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        const exec = async () => {
            await getTickets();
        };
        exec();
    }, []);

    let tickets = bookings.map((booking, index) => {
        return <Tickets bookingData={booking} key={index} />;
    });

    const displayTickets = name ? (
        <div className={classes.ticketsCtn}>{tickets}</div>
    ) : (
        <AuthModal text='Veuillez vous connecter pour accéder à vos réservations' />
    );

    return (
        <div className={classes.container}>
            <div className={classes.title}>Vos réservations</div>
            {displayTickets}
        </div>
    );
};

LayoutTickets.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = state => ({
    name: state.auth.name,
});

export default connect(mapStateToProps)(LayoutTickets);
