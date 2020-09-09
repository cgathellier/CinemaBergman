import React, { Fragment } from 'react';
import Register from '../../../components/Register/Register';
import Login from '../../../components/Login/Login';
import classes from './LayoutRegAuth.module.css';

const LayoutRegAuth = ({ regOrAuth }) => {
    const imgCinema = require('../../../img/cinema.jpg');

    const form = regOrAuth === 'register' ? <Register /> : <Login />;
    return (
        <div className={classes.container}>
            <div className={classes.illustration}>
                <img src={imgCinema} alt='Grande salle du Cinema Bergman' />
            </div>
            {form}
        </div>
    );
};

export default LayoutRegAuth;
