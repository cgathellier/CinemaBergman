import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Tickets.module.css';
import Moment from 'react-moment';

const MOIS = {
    0: 'janvier',
    1: 'février',
    2: 'mars',
    3: 'avril',
    4: 'mai',
    5: 'juin',
    6: 'juillet',
    7: 'août',
    8: 'septembre',
    9: 'octobre',
    10: 'novembre',
    11: 'décembre',
};

const JOURS = {
    0: 'dimanche',
    1: 'lundi',
    2: 'mardi',
    3: 'mercredi',
    4: 'jeudi',
    5: 'vendredi',
    6: 'samedi'
}

const Tickets = (props) => {
    const [showtimeData, setShowtimeData] = useState();
    const [filmData, setFilmData] = useState();
    const [seats, setSeats] = useState()

    const getStData = async () => {
        const res = await axios.get(`/api/showtimes/showtime/${props.bookingData.showtimeID}`)
        setShowtimeData(res.data)
    }

    const getFilmData = async () => {
        const res = await axios.get(`/api/films/${props.bookingData.filmID}`);
        setFilmData(res.data)
    }

    const getSeats = () => {
        const list = props.bookingData.selectedSeats.join(', ')
        setSeats(list)
    }

    useEffect(() => {
        getSeats();
        getStData();
        getFilmData();
    }, [])

    let day;
    let month;

    useEffect(() => {
        const dayIndex = new Date(showtimeData.day).getDay();
        const monthIndex = new Date(showtimeData.day).getMonth();
        day = JOURS[dayIndex];
        month = MOIS[monthIndex];
    }, [showtimeData])



    return (
        <div className={classes.container}>
            <img src={filmData.poster} alt={filmData.title}/>
            <div className={classes.infos}>
                <div className={classes.date}>
                    Séance du {day} 
                    <Moment format='DD'>{showtimeData.day}</Moment>{' '}
                    {month}{' '}
                    <Moment format='YYYY'>{showtimeData.day}</Moment>{' '}
                    à {showtimeData.hour}
                </div>
                <div className={classes.seats}>
                    Sièges : {seats}
                </div>
            </div>
        </div>
    )
}

export default Tickets;