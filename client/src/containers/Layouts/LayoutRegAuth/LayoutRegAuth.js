import React from 'react';
import Register from '../../../components/Register/Register';
import Login from '../../../components/Login/Login';
import classes from './LayoutRegAuth.module.css';

const LayoutRegAuth = props => {
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
                    src='https://i.ibb.co/jZSq9gq/cinema.jpg'
                    alt='Grande salle du Cinema Bergman'
                    className={classes.imgCinema}
                />
            </div>
            <div className={classes.form}>{form}</div>
        </div>
    );
};

export default LayoutRegAuth;
