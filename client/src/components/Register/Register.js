import React, { useState, useEffect } from 'react';
import classes from './Register.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
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
            console.alert('Les mots de passes ne correspondent pas');
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
                console.log(res.data);
            } catch (error) {
                console.error(error.response.data);
            }
        }
    };

    return (
        <div className={classes.container}>
            <h1>Créez votre compte</h1>
            <p>
                <Link to='/'>Retourner à la page d'accueil</Link>
            </p>
            <form className={classes.Form} onSubmit={e => onSubmit(e)}>
                <div className={classes.field}>
                    <input
                        type='text'
                        placeholder='Nom *'
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
            <p className={classes.Registered}>
                Vous avez déjà un compte ? <Link to='/login'>Connectez-vous</Link>
            </p>
        </div>
    );
}

export default Register;
