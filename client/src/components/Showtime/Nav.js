import React from 'react';
import classes from './Nav.module.css';

const Nav = props => {
    return (
        <div className={classes.container}>
            <div className={classes.day}>{props.day}</div>
            <div className={classes.date}>{props.date}</div>
            <div className={classes.month}>{props.month}</div>
        </div>
    );
};

export default Nav;
