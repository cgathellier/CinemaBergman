import React, { useEffect } from 'react';
import classes from './AdminPanel.module.css';
import { NavLink, Route } from 'react-router-dom';
import AddMovie from '../../../components/Admin/AddMovie/AddMovie';
import ModifyMovie from '../../../components/Admin/ModifyMovie/ModifyMovie';

const AdminPanel = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    const path = window.location.href.split('/admin/')[1];
    const form = path === 'addmovie' ? <AddMovie /> : <ModifyMovie />;
    return (
        <div className={classes.container}>
            <nav className={classes.menu}>
                <NavLink to='/admin/addmovie' activeClassName={classes.active}>
                    <div>
                        Ajouter un film
                    </div>
                </NavLink>
                <NavLink to='/admin/modifymovie' activeClassName={classes.active}>
                    <div>
                        Ajouter des séances, modifier ou supprimer un film
                    </div>
                </NavLink>
            </nav>
            <div className={classes.formContainer}>
                {form}
            </div>
        </div>
    );
};

export default AdminPanel;
