import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { showModal } from '../../actions/modal';

const Toolbar = ({ name, isAdmin, logout, showModal }) => {
    const adminNav = isAdmin ? (
        <NavLink to='/admin' activeClassName='toolbar__active'>
            <div>
                <i className='fas fa-user-lock toolbar__icons'></i>Admin
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
            <div className='toolbar__username'>{name}</div>
            <div className='toolbar__logoutBtn' onClick={handleLogout}>
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
        <div className='toolbar__user' onClick={handleModal}>
            <div className='toolbar__letter'>{nameFirstLetter}</div>
        </div>
    ) : (
        <NavLink to='/login'>
            <div className='toolbar__user'>
                <i className='faUser fas fa-user'></i>
            </div>
        </NavLink>
    );

    return (
        <header className='toolbar'>
            <div className='toolbar__presentation'>
                <div className='toolbar__name'>
                    <NavLink to='/'>Cinéma Bergman</NavLink>
                </div>
                <div className='toolbar__regAuthInterface'>
                    <div className='toolbar__toForms'>{usernameDisplay}</div>
                    {userIcon}
                </div>
            </div>
            <nav className='toolbar__menu'>
                <NavLink to='/' exact activeClassName='toolbar__active'>
                    <div>
                        <i className='fas fa-home toolbar__icons'></i>Accueil
                    </div>
                </NavLink>
                <NavLink to='/films' activeClassName='toolbar__active'>
                    <div>
                        <i className='fas fa-film toolbar__icons'></i>Films
                    </div>
                </NavLink>
                <NavLink to='/reservations' activeClassName='toolbar__active'>
                    <div>
                        <i className='fas fa-ticket-alt toolbar__icons'></i>Billets
                    </div>
                </NavLink>
                {adminNav}
            </nav>
        </header>
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
