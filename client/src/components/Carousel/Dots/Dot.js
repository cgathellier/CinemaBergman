import React from 'react';

const Dot = props => {
    const style = props.selected === 'true' ? 'dot--selected' : 'dot';
    return <div className={style}></div>;
};

export default Dot;
