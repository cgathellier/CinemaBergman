import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './AuthModal.module.css';

const AuthModal = ({ text }) => {
    return (
        <div className={classes.getLogged}>
            {text}
            <NavLink to='/login'>
                <div>Se connecter</div>
            </NavLink>
            <NavLink to='/register'>
                <div>Créer un compte</div>
            </NavLink>
        </div>
    );
};
export default AuthModal;
