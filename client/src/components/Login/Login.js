import React, { useState } from 'react';
import classes from './Login.module.css';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = props => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        props.login(email, password);
        document.location.reload();
        history.goBack();
    };

    return (
        <div className={classes.container}>
            <div className={classes.Name}>
                <NavLink to='/'>Cinéma Bergman</NavLink>
            </div>
            <div>
                <Link to='/'>
                    <p className={classes.toHome}>
                        <i className='fas fa-angle-left'></i>Retourner à la page d'accueil
                    </p>
                </Link>
            </div>
            <form className={classes.Form} onSubmit={e => onSubmit(e)}>
                <div className={classes.field}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        name='email'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='password'
                        placeholder='Mot de passe'
                        value={password}
                        name='password'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <input type='submit' className={classes.submit} value='Connexion'></input>
            </form>
            <div className={classes.notRegistered}>
                Vous n'avez pas encore de compte ?
                <NavLink to='/register'>
                    <p className={classes.toRegister}>
                        Inscrivez-vous<i className='fas fa-angle-right'></i>
                    </p>
                </NavLink>
            </div>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
