import React, {useContext, useEffect, useState} from 'react';
import { NameContext } from '../../Main';
import classes from './LayoutTickets.module.css';
import axios from 'axios';
import Tickets from '../../../components/Tickets/Tickets';
import Post from '../../../components/Post/Post';

const LayoutTickets = () => {
    const [bookings, setBookings] = useState([])
    const [posts, setPosts] = useState([]);
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
            setBookings(res.data)
        }
    }

    const getData = async () => {
        const getPosts = await axios.get(`/api/posts/5f8fea1894af4200172eaad6`);
        setPosts(getPosts.data);
    };

    useEffect(() => {
        window.scroll(0, 0);
        const exec = async () => {
            await getTickets()
            // await getData();
        }
        exec();
    }, [])

    let tickets = bookings.map((booking, index) => {
        return <Tickets bookingData={booking} key={index} />
    })

    const displayTickets = tickets.length > 0 ? (
        <div>
            {tickets}
        </div>
    ) : '';

    return (
        <div className={classes.container}>
            <div className={classes.title}>Vos réservations</div>
            {displayTickets}
        </div>
    )
}

export default LayoutTickets;
