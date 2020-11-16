import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Showtime = props => {
    const onClickCross = () => {
        props.onClickCross(props.id);
    };

    const content = props.onClickCross ? (
        <div className='showtime__container'>
            {props.children}
            <div className='showtime__crossContainer' onClick={() => onClickCross()}>
                <i className='far fa-times-circle showtime__cross'></i>
            </div>
        </div>
    ) : (
        <NavLink to={`/booking/${props.id}`}>
            <div className='showtime__container'>{props.children}</div>
        </NavLink>
    );
    return <Fragment>{content}</Fragment>;
};

export default Showtime;
