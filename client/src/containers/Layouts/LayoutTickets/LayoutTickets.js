import React, {useContext, useEffect, useState} from 'react';
import { NameContext } from '../../Main';
import classes from './LayoutTickets.module.css';
import axios from 'axios';
import Tickets from '../../../components/Tickets/Tickets';

const LayoutTickets = () => {
    const [bookings, setBookings] = useState([])
    const name = useContext(NameContext);

    const getTickets = async () => {
        const token = localStorage.getItem('token');
        const config = {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }

        const res = await axios.get('/api/bookings/user', config);
        setBookings(res.data)
    }

    const displayTickets = bookings.map(booking => {
        return <Tickets bookingData={booking} />
    })

    useEffect(() => {
        getTickets()
    }, [])

    return (
        <div className={classes.container}>
            
        </div>
    )
}

export default LayoutTickets;
