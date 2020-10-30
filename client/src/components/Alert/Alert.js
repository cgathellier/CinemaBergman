import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Alert.css';

const Alert = ({ alerts }) => {
    if (alerts !== null && alerts.length > 0) {
        const alertBloc = alerts.map(alert => {
            return (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.message}
                </div>
            );
        });
        return <div className={'alertCtn'}>{alertBloc}</div>;
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
