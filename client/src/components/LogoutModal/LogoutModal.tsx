import * as React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal';
import { logout } from '../../actions/auth';
import { IReduxState } from '../../utils/Interfaces';

interface ILogoutModalProps {
	displayModal: boolean;
	logout: () => void;
	hideModal: () => void;
}

export const LogoutModal = ({ displayModal, logout, hideModal }: ILogoutModalProps) =>
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

const mapStateToProps = (state: IReduxState) => ({
	displayModal: state.modal.displayModal,
});

export default connect(mapStateToProps, { logout, hideModal })(LogoutModal);
