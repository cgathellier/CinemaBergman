import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddMovie from '../../components/Admin/AddMovie/AddMovie';
import ModifyMovie from '../../components/Admin/ModifyMovie/ModifyMovie';

const AdminPanel = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const path = window.location.href.split('/admin/')[1];
    const form = path === 'addmovie' ? <AddMovie /> : <ModifyMovie />;
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
            <div className='AdminPanel__formContainer'>{form}</div>
        </div>
    );
};

export default AdminPanel;
