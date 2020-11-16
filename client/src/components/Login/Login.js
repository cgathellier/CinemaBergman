import React, { useState } from 'react';
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
        <div className='regAuth__container'>
            <div className='regAuth__name'>
                <NavLink to='/'>Cinéma Bergman</NavLink>
            </div>
            <div>
                <Link to='/'>
                    <p className='regAuth__toHome'>
                        <i className='fas fa-angle-left'></i>Retourner à la page d'accueil
                    </p>
                </Link>
            </div>
            <form className='regAuth__form' onSubmit={e => onSubmit(e)}>
                <div className='regAuth__field'>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        name='email'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className='regAuth__field'>
                    <input
                        type='password'
                        placeholder='Mot de passe'
                        value={password}
                        name='password'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <input type='submit' className='regAuth__submit' value='Connexion'></input>
            </form>
            <div className='regAuth__alternateBloc'>
                Vous n'avez pas encore de compte ?
                <NavLink to='/register'>
                    <p className='regAuth__alternateLinks'>
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
