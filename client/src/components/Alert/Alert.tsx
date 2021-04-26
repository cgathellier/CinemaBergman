import * as React from 'react';
import { connect } from 'react-redux';
import { IAlert, IReduxState } from '../../utils/Interfaces';

interface IAlertProps {
	alerts?: IAlert[];
}

const Alert = ({ alerts }: IAlertProps) => {
	if (alerts !== undefined && alerts.length > 0) {
		const alertBloc = alerts.map(alert => {
			return (
				<div
					key={alert.id}
					className={`alert__item alert__item--${alert.alertType}`}
				>
					{alert.message}
				</div>
			);
		});
		return <div className='alert__container'>{alertBloc}</div>;
	}
	return null;
};

const mapStateToProps = (state: IReduxState) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
