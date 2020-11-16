import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
    if (alerts !== null && alerts.length > 0) {
        const alertBloc = alerts.map(alert => {
            return (
                <div key={alert.id} className={`alert__item alert__item--${alert.alertType}`}>
                    {alert.message}
                </div>
            );
        });
        return <div className='alert__container'>{alertBloc}</div>;
    }
    return null;
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
