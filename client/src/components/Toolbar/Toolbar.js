import React, { Fragment } from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { showModal } from '../../actions/modal';

const Toolbar = ({ name, isAdmin, logout, showModal }) => {
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
        logout();
        window.scroll(0, 0);
        document.location.reload();
    };

    const handleModal = () => {
        showModal();
    };

    const usernameDisplay = name ? (
        <Fragment>
            <div className={classes.username}>{name}</div>
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
        <div className={classes.User} onClick={handleModal}>
            <div className={classes.letter}>{nameFirstLetter}</div>
        </div>
    ) : (
        <NavLink to='/login'>
            <div className={classes.User}>
                <i className={[classes.faUser, 'fas fa-user'].join(' ')}></i>
            </div>
        </NavLink>
    );

    return (
        <div className={classes.Toolbar}>
            <div className={classes.Presentation}>
                <div className={classes.Name}>
                    <NavLink to='/'>Cinéma Bergman</NavLink>
                </div>
                <div className={classes.RegAuthInterface}>
                    <div className={classes.toForms}>{usernameDisplay}</div>
                    {userIcon}
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

Toolbar.propTypes = {
    name: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    name: state.auth.name,
    isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, { logout, showModal })(Toolbar);
