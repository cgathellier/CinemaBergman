import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import AddMovie from '../../components/Admin/AddMovie/AddMovie';
import ModifyMovie from '../../components/Admin/ModifyMovie/ModifyMovie';
import history from '../../history';
import { IReduxState } from '../../utils/Interfaces';

interface IAdminPanel {
	isAdmin: boolean;
}

export const AdminPanel = ({ isAdmin }: IAdminPanel) => {
	React.useEffect(() => {
		if (!isAdmin) {
			history.push('/');
		}
		// window.scroll(0, 0);
	}, [isAdmin]);

	return (
		<div className='AdminPanel__container'>
			<nav className='AdminPanel__menu'>
				<NavLink to='/admin/addmovie' activeClassName='AdminPanel__active'>
					<div>Ajouter un film</div>
				</NavLink>
				<NavLink to='/admin/modifymovie' activeClassName='AdminPanel__active'>
					<div>Ajouter des séances, modifier ou supprimer un film</div>
				</NavLink>
			</nav>
			<div className='AdminPanel__formContainer'>
				<Route path='/admin/addmovie' exact render={() => <AddMovie />} />
				<Route path='/admin/modifymovie' render={() => <ModifyMovie />} />
			</div>
		</div>
	);
};

const mapStateToProps = (state: IReduxState) => ({
	isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(AdminPanel);
