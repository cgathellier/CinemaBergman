import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

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
            <img src={props.filmData.snap} alt={props.filmData.title} className='slide__image' />
            <div className='slide__grad'>
                <div className='slide__presentation'>
                    <h2>Nouveauté</h2>
                    <p className='slide__title'>
                        {props.filmData.title}
                        <NavLink to={`/films/${props.filmData._id}`}>
                            <span className='slide__link'>Découvrir</span>
                            <i className='fas fa-angle-right'></i>
                        </NavLink>
                    </p>
                </div>
            </div>
        </Fragment>
    ) : null;

    return (
        <div
            className='slide'
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
