import React, { useState } from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';

const Toolbar = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const adminNav = isAdmin ? (
        <NavLink to='/admin' activeClassName={classes.active}>
            <div>
                <i className={['fas fa-user-lock', classes.Icons].join(' ')}></i>Admin
            </div>
        </NavLink>
    ) : (
        ''
    );

    return (
        <div className={classes.Toolbar}>
            <div className={classes.Presentation}>
                <div className={classes.Name}>
                    <NavLink to='/'>Cinéma Bergman</NavLink>
                </div>
                <div className={classes.RegAuthInterface}>
                    <div className={classes.toForms}>
                        <NavLink to='/register'>Créer un compte</NavLink>
                        <NavLink to='/login'>Me connecter</NavLink>
                    </div>
                    <NavLink to='/login'>
                        <div className={classes.User}>
                            <i className={['fas fa-user', classes.faUser].join(' ')}></i>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className={classes.Menu}>
                {adminNav}
                <NavLink to='/films' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-film', classes.Icons].join(' ')}></i>Films
                    </div>
                </NavLink>
                <NavLink to='/billets' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-receipt', classes.Icons].join(' ')}></i>Vos billets
                    </div>
                </NavLink>
                {/* <div></div> */}
            </div>
        </div>
    );
};

export default Toolbar;
