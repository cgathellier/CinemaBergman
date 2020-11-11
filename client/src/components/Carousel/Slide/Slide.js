import React, { Fragment } from 'react';
import classes from './Slide.module.css';

const Slide = props => {
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
                    <p>{props.filmData.title}</p>
                </div>
            </div>
        </Fragment>
    ) : null;
    return (
        <div className={classes.Slide} style={style}>
            {display}
        </div>
    );
};

export default Slide;
