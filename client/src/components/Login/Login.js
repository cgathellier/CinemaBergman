import React, { useState } from 'react';
import classes from './Login.module.css';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history';

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

        let auth = {
            email,
            password,
        };

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const body = JSON.stringify(auth);

            const res = await axios.post('/api/auth', body, config);
            localStorage.setItem('token', res.data.token);
            props.getUsername(res.data.name);
            props.getIsAdmin(res.data.isAdmin);
            history.push('/');
        } catch (error) {
            console.error(error.response.data);
        }
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

export default Login;
