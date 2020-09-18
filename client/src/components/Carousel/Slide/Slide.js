import React, { useEffect } from 'react';
import classes from './Slide.module.css';
import axios from 'axios';

const Slide = props => {
    return (
        <div className={classes.Slide}>
            <img src={props.filmSnap} alt={props.title} className={classes.image} />
            <div className={classes.grad}>
                <div className={classes.presentation}>
                    <h2>Nouveauté</h2>
                    <p>{props.title}</p>
                </div>
            </div>
        </div>
    );
};

export default Slide;
