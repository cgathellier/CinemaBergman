import React from 'react';
import classes from './Nav.module.css';

const Nav = props => {
    const navStyle = props.selected === 'true' ? 'selectedContainer' : 'container';

    const handleClick = () => {
        props.handleClick(props.index);
    };
    return (
        <div className={classes[navStyle]} onClick={() => handleClick()}>
            <div className={classes.day}>{props.day}</div>
            <div className={classes.date}>{props.date}</div>
            <div className={classes.month}>{props.month}</div>
        </div>
    );
};

export default Nav;
