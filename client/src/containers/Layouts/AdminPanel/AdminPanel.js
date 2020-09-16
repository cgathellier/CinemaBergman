import React from 'react';
import classes from './AdminPanel.module.css';
import { NavLink, Route } from 'react-router-dom';
import AddMovie from '../../../components/Admin/AddMovie/AddMovie';
import ModifyMovie from '../../../components/Admin/ModifyMovie/ModifyMovie';

const AdminPanel = () => {
    return (
        <div className={classes.container}>
            <nav className={classes.menu}>
                <NavLink to='/admin/addmovie' className={classes.item}>
                    Ajouter un film
                </NavLink>
                <NavLink to='/admin/modifymovie' className={classes.item}>
                    Modifier un film
                </NavLink>
            </nav>

            <Route exact path='/admin/addmovie' render={() => <AddMovie />} />
            <Route exact path='/admin/modifymovie' render={() => <ModifyMovie />} />
        </div>
    );
};

export default AdminPanel;
