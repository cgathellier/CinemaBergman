import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

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
            props.setAlert('Les mots de passes ne correspondent pas', 'danger');
        } else {
            props.register(name, email, password);
            document.location.reload();
            history.goBack();
        }
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
                        type='text'
                        placeholder="Nom d'utilisateur *"
                        value={name}
                        name='name'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className='regAuth__field'>
                    <input
                        type='email'
                        placeholder='Email *'
                        value={email}
                        name='email'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className='regAuth__field'>
                    <input
                        type='password'
                        placeholder='Mot de passe *'
                        value={password}
                        name='password'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <div className='regAuth__field'>
                    <input
                        type='password'
                        placeholder='Confirmation du mot de passe *'
                        value={password2}
                        name='password2'
                        required
                        onChange={e => onChange(e)}
                    ></input>
                </div>
                <input type='submit' className='regAuth__submit' value='Continuer'></input>
            </form>
            <div className='regAuth__alternateBloc'>
                Vous avez déjà un compte ?
                <NavLink to='/login'>
                    <p className='regAuth__alternateLinks'>
                        Connectez-vous<i className='fas fa-angle-right'></i>
                    </p>
                </NavLink>
            </div>
        </div>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
