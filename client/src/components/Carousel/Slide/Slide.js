import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Slide.module.css';

const Slide = props => {
    const {
        onTouchStart,
        // onTouchMove,
        onTouchEnd,
        onMouseDown,
        // onMouseMove,
        onMouseUp,
        onMouseLeave,
    } = props;

    const style = {
        width: `${props.width}px`,
        backgroundColor: `${props.color}`,
    };

    const display = props.filmData ? (
        <Fragment>
            <img src={props.filmData.snap} alt={props.filmData.title} className={classes.image} />
            <div className={classes.grad}>
                <div className={classes.presentation}>
                    <h2>Nouveauté</h2>
                    <p className={classes.title}>
                        {props.filmData.title}
                        <NavLink to={`/films/${props.filmData._id}`}>
                            <span className={classes.link}>Découvrir</span>
                            <i className='fas fa-angle-right'></i>
                        </NavLink>
                    </p>
                </div>
            </div>
        </Fragment>
    ) : null;

    return (
        <div
            className={classes.Slide}
            style={style}
            onTouchStart={onTouchStart}
            // onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
        >
            {display}
        </div>
    );
};

export default Slide;
