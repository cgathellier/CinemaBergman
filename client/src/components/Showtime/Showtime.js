import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Showtime.module.css';

const Showtime = props => {
    const onClickCross = () => {
        props.onClickCross(props.id);
    };

    const content = props.onClickCross ? (
        <div className={classes.container}>
            {props.children}
            <div className={classes.crossContainer} onClick={() => onClickCross()}>
                <i className={['far fa-times-circle', classes.cross].join(' ')}></i>
            </div>
        </div>
    ) : (
        <NavLink to={`/booking/${props.id}`}>
            <div className={classes.container}>{props.children}</div>
        </NavLink>
    );
    return <Fragment>{content}</Fragment>;
};

export default Showtime;
