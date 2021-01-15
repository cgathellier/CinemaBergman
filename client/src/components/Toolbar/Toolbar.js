import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { showModal } from '../../actions/modal';
import PropTypes from 'prop-types';

export const Toolbar = ({ name, isAdmin, logout, showModal }) => (
	<header className='toolbar'>
		<div className='toolbar__presentation'>
			<div className='toolbar__name'>
				<NavLink to='/'>Cinéma Bergman</NavLink>
			</div>
			<div className='toolbar__regAuthInterface'>
				<div className='toolbar__toForms'>
					{name ? (
						<>
							<div className='toolbar__username'>{name}</div>
							<div className='toolbar__logoutBtn' onClick={logout}>
								Se déconnecter
							</div>
						</>
					) : (
						<>
							<NavLink to='/register'>Créer un compte</NavLink>
							<NavLink to='/login'>Me connecter</NavLink>
						</>
					)}
				</div>
				{name ? (
					<div className='toolbar__user' onClick={showModal}>
						<div className='toolbar__letter'>
							{name ? name.split('')[0] : ''}
						</div>
					</div>
				) : (
					<NavLink to='/login'>
						<div className='toolbar__user'>
							<i className='faUser fas fa-user'></i>
						</div>
					</NavLink>
				)}
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
			{isAdmin ? (
				<NavLink to='/admin' activeClassName='toolbar__active'>
					<div>
						<i className='fas fa-user-lock toolbar__icons'></i>Admin
					</div>
				</NavLink>
			) : (
				''
			)}
		</nav>
	</header>
);

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
