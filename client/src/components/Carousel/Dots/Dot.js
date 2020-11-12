import React from 'react';
import classes from './Dot.module.css';

const Dot = props => {
    const style = props.selected === 'true' ? 'selected' : 'Dot';
    return <div className={classes[style]}></div>;
};

export default Dot;
