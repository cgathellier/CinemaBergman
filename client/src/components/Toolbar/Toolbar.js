import React, { Fragment, useContext } from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';
import { IsAdminContext, NameContext } from '../../containers/Main';

const Toolbar = () => {
    const isAdmin = useContext(IsAdminContext);
    const name = useContext(NameContext);
    const adminNav = isAdmin ? (
        <NavLink to='/admin/addmovie' activeClassName={classes.active}>
            <div>
                <i className={['fas fa-user-lock', classes.Icons].join(' ')}></i>Admin
            </div>
        </NavLink>
    ) : (
        ''
    );

    const usernameDisplay = name ? (
        <div>{name}</div>
    ) : (
        <Fragment>
            <NavLink to='/register'>Créer un compte</NavLink>
            <NavLink to='/login'>Me connecter</NavLink>
        </Fragment>
    );

    return (
        <div className={classes.Toolbar}>
            <div className={classes.Presentation}>
                <div className={classes.Name}>
                    <NavLink to='/'>Cinéma Bergman</NavLink>
                </div>
                <div className={classes.RegAuthInterface}>
                    <div className={classes.toForms}>{usernameDisplay}</div>
                    <NavLink to='/login'>
                        <div className={classes.User}>
                            <i className={['fas fa-user', classes.faUser].join(' ')}></i>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className={classes.Menu}>
                <NavLink to='/films' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-film', classes.Icons].join(' ')}></i>Films
                    </div>
                </NavLink>
                {/* <NavLink to='/booking' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-receipt', classes.Icons].join(' ')}></i>Vos billets
                    </div>
                </NavLink> */}
                {adminNav}
            </div>
        </div>
    );
};

export default Toolbar;
