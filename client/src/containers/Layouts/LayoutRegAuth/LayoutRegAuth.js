import React from 'react';
import Register from '../../../components/Register/Register';
import Login from '../../../components/Login/Login';
import classes from './LayoutRegAuth.module.css';

const LayoutRegAuth = props => {
    const imgCinema = require('../../../img/cinema.jpg');

    const getUsername = username => {
        props.getUsername(username);
    };

    const getIsAdmin = isAdmin => {
        props.getIsAdmin(isAdmin);
    };

    const form = props.regOrAuth === 'register' ? <Register {...props} /> : <Login {...props} />;

    return (
        <div className={classes.container}>
            <div className={classes.illustration}>
                <img
                    src={imgCinema}
                    alt='Grande salle du Cinema Bergman'
                    className={classes.imgCinema}
                />
            </div>
            <div className={classes.form}>{form}</div>
            {/* {form} */}
        </div>
    );
};

export default LayoutRegAuth;
