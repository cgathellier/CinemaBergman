import React from 'react';
import classes from './Showtime.module.css';

const Showtime = props => {
    return <div className={classes.container}>{props.hour}</div>;
};

export default Showtime;
