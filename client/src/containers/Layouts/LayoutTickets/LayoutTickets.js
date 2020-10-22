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
        if (token) {
            const config = {
                headers: {
                    'x-auth-token': token
                }
            }
            const getUserId = await axios.get('/api/auth', config);
            console.log(getUserId.data)
    
            const res = await axios.get(`/api/bookings/user/${getUserId.data._id}`, config);
            setBookings(res.data)
        }
    }

    // const displayTickets = bookings.map(booking => {
    //     return <Tickets bookingData={booking} />
    // })

    useEffect(() => {
        getTickets()
    }, [])

    return (
        <div className={classes.container}>
            {/* {displayTickets} */}
        </div>
    )
}

export default LayoutTickets;
