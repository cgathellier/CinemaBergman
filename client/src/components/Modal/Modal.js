import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Modal.module.css';
import { hideModal } from '../../actions/modal';
import { logout } from '../../actions/auth';

const Modal = ({ displayModal, logout, hideModal }) => {
    const handleLogout = () => {
        logout();
    };

    const handleHideModal = () => {
        hideModal();
    };

    if (displayModal) {
        return (
            <div className={classes.container}>
                <div className={classes.backdrop} onClick={handleHideModal}></div>
                <div className={classes.modal}>
                    <div>Se déconnecter</div>
                    <div className={classes.iconCtn} onClick={handleLogout}>
                        <i className={['fas fa-sign-out-alt', classes.icon].join(' ')}></i>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

Modal.propTypes = {
    displayModal: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    displayModal: state.modal.displayModal,
});

export default connect(mapStateToProps, { logout, hideModal })(Modal);
