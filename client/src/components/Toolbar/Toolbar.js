import React, { Fragment, useContext } from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';
import { IsAdminContext, NameContext } from '../../containers/Main';

const Toolbar = () => {
    const isAdmin = useContext(IsAdminContext);
    const name = useContext(NameContext);
    const adminNav = isAdmin ? (
        <NavLink to='/admin' activeClassName={classes.active}>
            <div>
                <i className={['fas fa-user-lock', classes.Icons].join(' ')}></i>Admin
            </div>
        </NavLink>
    ) : (
        ''
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.scroll(0, 0);
        document.location.reload();
    };

    const usernameDisplay = name ? (
        <Fragment>
            <div>{name}</div>
            <div className={classes.logoutBtn} onClick={handleLogout}>
                Se déconnecter
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <NavLink to='/register'>Créer un compte</NavLink>
            <NavLink to='/login'>Me connecter</NavLink>
        </Fragment>
    );
    
    const nameFirstLetter = name ? name.split('')[0] : '';
    const userIcon = name ? (
        <div className={classes.User}>
            <div className={classes.letter}>{nameFirstLetter}</div>
        </div>
    ) : (
        <div className={classes.User}>
            <i className={[classes.faUser, 'fas fa-user'].join(' ')}></i>
        </div>
    )

    return (
        <div className={classes.Toolbar}>
            <div className={classes.Presentation}>
                <div className={classes.Name}>
                    <NavLink to='/'>Cinéma Bergman</NavLink>
                </div>
                <div className={classes.RegAuthInterface}>
                    <div className={classes.toForms}>{usernameDisplay}</div>
                    <NavLink to='/login'>
                        {userIcon}
                    </NavLink>
                </div>
            </div>
            <div className={classes.Menu}>
                <NavLink to='/' exact activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-home', classes.Icons].join(' ')}></i>Accueil
                    </div>
                </NavLink>
                <NavLink to='/nouveautes' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-star', classes.Icons].join(' ')}></i>Nouveautés
                    </div>
                </NavLink>
                <NavLink to='/films' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-film', classes.Icons].join(' ')}></i>Films
                    </div>
                </NavLink>
                <NavLink to='/reservations' activeClassName={classes.active}>
                    <div>
                        <i className={['fas fa-ticket-alt', classes.Icons].join(' ')}></i>Billets
                    </div>
                </NavLink>
                {adminNav}
            </div>
        </div>
    );
};

export default Toolbar;
