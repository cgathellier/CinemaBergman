import React from 'react';
import classes from './Slide.module.css';

const Slide = props => {
    const imgPath = require('../../../img/snaps/' + props.title + '.jpeg');

    return (
        <div className={classes.Slide}>
            <img src={imgPath} alt={props.title} className={classes.image} />
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
