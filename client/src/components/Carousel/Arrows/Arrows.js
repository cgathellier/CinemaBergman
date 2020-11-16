import React from 'react';

const Arrows = props => {
    const direction = props.direction === 'right' ? 'fas fa-angle-right' : 'fas fa-angle-left';
    const position = props.direction;
    const style = { display: `${props.display}` };

    return (
        <div className={`arrow arrow--${position}`} style={style} onClick={props.handleClick}>
            <i className={direction}></i>
        </div>
    );
};

export default Arrows;
