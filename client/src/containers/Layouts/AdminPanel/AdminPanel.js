import React from 'react';
import classes from './AdminPanel.module.css';
import { NavLink, Route } from 'react-router-dom';
import AddMovie from '../../../components/Admin/AddMovie/AddMovie';
import ModifyMovie from '../../../components/Admin/ModifyMovie/ModifyMovie';

const AdminPanel = () => {
    const path = window.location.href.split('/admin/')[1];
    const form = path === 'addmovie' ? <AddMovie /> : <ModifyMovie />;
    return (
        <div className={classes.container}>
            <nav className={classes.menu}>
                <NavLink to='/admin/addmovie' className={classes.item}>
                    Ajouter un film
                </NavLink>
                <NavLink to='/admin/modifymovie' className={classes.item}>
                    Modifier ou supprimer un film
                </NavLink>
            </nav>
            <div className={classes.formContainer}>
                {form}
                {/* <Route exact path='/admin/addmovie' component={AddMovie} />
                <Route path='/admin/modifymovie' component={ModifyMovie} /> */}
            </div>
        </div>
    );
};

export default AdminPanel;
