import React, {useContext, useEffect, useState} from 'react';
import { NameContext } from '../../Main';
import classes from './LayoutTickets.module.css';
import axios from 'axios';
import Tickets from '../../../components/Tickets/Tickets';

const LayoutTickets = () => {
    const [bookings, setBookings] = useState([])
    const [tickets, setTickets] = useState([])
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
            const res = await axios.get(`/api/bookings/user/${getUserId.data._id}`, config);
            await setBookings(res.data)
            let displayTickets = res.data.map(booking => {
                const req = async () => {
                    const getStData = await axios.get(`/api/showtimes/showtime/${booking.showtimeID}`);
                    const getFilmData = await axios.get(`/api/films/${booking.filmID}`);
                    return <Tickets bookingData={booking} key={booking._id} stData={getStData.data} filmData={getFilmData.data}/>
                }
                req();
            })
            await setTickets(displayTickets)
        }
    }

    // const display = () => {
    //     for (let i = 0 ; i < bookings.length ; i++) {
    //         let item = <Tickets bookingData={bookings[i]} key={bookings[i]._id}/>;
    //         setTickets(tickets => [...tickets], item )
    //     }
    // }

    useEffect(() => {
        window.scroll(0, 0);
        const exec = async () => {
            await getTickets()
            // await display();
        }
        exec();
        for (let i = 0 ; i < bookings.length ; i++) {
            const coucou = <div>coucou</div>;
            setTickets(items => [...items], coucou)
        }
    }, [])

    useEffect(() => {

    })

    // let displayTickets = bookings.map(booking => {
    //     return <Tickets bookingData={booking} key={booking._id}/>
    // })

    // useEffect(() => {
    //     for (let i = 0 ; i < bookings.length ; i++) {
    //         let item = <Tickets bookingData={bookings[i]} key={bookings[i]._id}/>;
    //         setTickets(tickets => [...tickets], item )
    //     }
    // }, [bookings])

    return (
        <div className={classes.container}>
            {tickets}
        </div>
    )
}

export default LayoutTickets;
