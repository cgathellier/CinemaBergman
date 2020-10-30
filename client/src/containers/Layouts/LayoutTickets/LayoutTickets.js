import React, { useEffect, useState } from 'react';
import classes from './LayoutTickets.module.css';
import axios from 'axios';
import Tickets from '../../../components/Tickets/Tickets';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        <div className={classes.getLogged}>
            Veuillez vous connecter pour accéder à vos réservations
            <NavLink to='/login'>
                <div>Se connecter</div>
            </NavLink>
            <NavLink to='/register'>
                <div>Créer un compte</div>
            </NavLink>
        </div>
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
