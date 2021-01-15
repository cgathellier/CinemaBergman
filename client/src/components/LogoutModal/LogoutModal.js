import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal';
import { logout } from '../../actions/auth';

export const LogoutModal = ({ displayModal, logout, hideModal }) =>
	displayModal ? (
		<div className='logoutModal__container'>
			<div className='logoutModal__backdrop' onClick={hideModal}></div>
			<div className='logoutModal__modal'>
				<div>Se déconnecter</div>
				<div className='logoutModal__iconCtn' onClick={logout}>
					<i className='fas fa-sign-out-alt logoutModal__icon'></i>
				</div>
			</div>
		</div>
	) : null;

LogoutModal.propTypes = {
	displayModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	displayModal: state.modal.displayModal,
});

export default connect(mapStateToProps, { logout, hideModal })(LogoutModal);
