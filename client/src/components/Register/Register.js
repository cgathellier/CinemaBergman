import React, { useState } from 'react';
import classes from './Register.module.css';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history';

const Register = props => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            console.log('Les mots de passes ne correspondent pas');
        } else {
            let newUser = {
                name,
                email,
                password,
            };

            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };

                const body = JSON.stringify(newUser);

                const res = await axios.post('/api/users', body, config);
                localStorage.setItem('token', res.data.token);
                props.getUsername(res.data.name);
                props.getIsAdmin(res.data.isAdmin);
                document.location.reload();
            history.goBack();
            } catch (error) {
                console.error(error.response.data);
            }
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
                        type='text'
                        placeholder="Nom d'utilisateur *"
                        value={name}
                        name='name'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='email'
                        placeholder='Email *'
                        value={email}
                        name='email'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='password'
                        placeholder='Mot de passe *'
                        value={password}
                        name='password'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className={classes.field}>
                    <input
                        type='password'
                        placeholder='Confirmation du mot de passe *'
                        value={password2}
                        name='password2'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <input type='submit' className={classes.submit} value='Continuer'></input>
            </form>
            <div className={classes.Registered}>
                Vous avez déjà un compte ?
                <NavLink to='/login'>
                    <p className={classes.toLogin}>
                        Connectez-vous<i className='fas fa-angle-right'></i>
                    </p>
                </NavLink>
            </div>
        </div>
    );
};

export default Register;
