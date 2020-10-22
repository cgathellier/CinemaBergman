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
    const [poster, setPoster] = useState();
    const [title, setTitle] = useState();
    const [hour, setHour] = useState();
    const [day, setDay] = useState();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const list = props.bookingData.selectedSeats.join(', ');

    const getStData = async () => {
        const res = await axios.get(`/api/showtimes/showtime/${props.bookingData.showtimeID}`);
        const dateElt = <Moment format='DD'>{res.data.day}</Moment>;
        const yearElt = <Moment format='YYYY'>{res.data.day}</Moment>;
        setHour(res.data.hour);
        setDate(dateElt);
        setYear(yearElt);
        setShowtimeData(res.data)
    }

    const getFilmData = async () => {
        const res = await axios.get(`/api/films/${props.bookingData.filmID}`);
        const img = <img src={res.data.poster} alt={res.data.title} className={classes.img}/>;
        const titleElt = <div className={classes.title}>{res.data.title}</div>
        setPoster(img);
        setTitle(titleElt);
    }
    
    useEffect(() => {
        getStData();
        getFilmData();
    }, [])
    
    useEffect(() => {
        if (showtimeData) {
            const dayIndex = new Date(showtimeData.day).getDay();
            const monthIndex = new Date(showtimeData.day).getMonth();
            const dayName = JOURS[dayIndex]; 
            const monthName = MOIS[monthIndex];
            setDay(dayName);
            setMonth(monthName);
        }
    }, [showtimeData])



    return (
        <div className={classes.container}>
            <div className={classes.imgContainer}>
                {poster}
            </div>
            <div className={classes.infos}>
                {title}
                <div className={classes.date}>
                    Séance du {day} {date} {month} {year} à {hour}
                </div>
                <div className={classes.seats}>
                    Sièges : {list}
                </div>
            </div>
        </div>
    )
}

export default Tickets;