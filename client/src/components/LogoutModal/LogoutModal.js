import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal';
import { logout } from '../../actions/auth';

const LogoutModal = ({ displayModal, logout, hideModal }) => {
    const handleLogout = () => {
        logout();
    };

    const handleHideModal = () => {
        hideModal();
    };

    if (displayModal) {
        return (
            <div className='logoutModal__container'>
                <div className='logoutModal__backdrop' onClick={handleHideModal}></div>
                <div className='logoutModal__modal'>
                    <div>Se déconnecter</div>
                    <div className='logoutModal__iconCtn' onClick={handleLogout}>
                        <i className='fas fa-sign-out-alt logoutModal__icon'></i>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

LogoutModal.propTypes = {
    displayModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    displayModal: state.modal.displayModal,
});

export default connect(mapStateToProps, { logout, hideModal })(LogoutModal);
