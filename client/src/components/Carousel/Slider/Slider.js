import React from 'react';
import classes from './Slider.module.css';

const Slider = props => {
    const style = {
        width: `${props.width}px`,
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-in-out ${props.transition}s`,
    };

    return (
        <div className={classes.slider} style={style}>
            {props.children}
        </div>
    );
};

export default Slider;
