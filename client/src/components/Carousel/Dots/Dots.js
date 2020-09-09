import React from 'react';
import classes from './Dots.module.css'

const Dots = (props) => {
    const dotStyle = props.selected === "true" ? "selected" : "Dot";

    const handleClick = (index) => {
        props.handleClickDot(index);
    }

    return (
        <div className={classes[dotStyle]} onClick={() => handleClick(props.index)}></div>
    )
}

export default Dots;
