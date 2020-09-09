import React, { Fragment } from 'react';
import classes from './Modal.module.css';

const Modal = props => {
    let modalShow;
    if (props.show) {
        const imgPath = require('../../img/posters/' + props.specs.title + '.jpeg');
        modalShow = (
            <Fragment>
                <div className={classes.Backdrop} onClick={props.onClickBackdrop}></div>
                <div className={classes.Modal}>
                    <div className={classes.Public}>{props.specs.public}</div>
                    <div>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{props.specs.title}</span> de{' '}
                        {props.specs.director}
                    </div>
                    <div>
                        {props.specs.genre} ({props.specs.duration})
                    </div>
                    {/* <div>{props.specs.shows}</div> */}
                    <div className={classes.Croix}>
                        <i className='fas fa-times' onClick={props.onClickBackdrop}></i>
                    </div>
                    <img src={imgPath} alt={props.specs.title}></img>
                </div>
            </Fragment>
        );
    } else {
        modalShow = null;
    }

    return <Fragment>{modalShow}</Fragment>;
};

export default Modal;
