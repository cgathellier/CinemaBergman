import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

interface IRegisterProps {
	setAlert: (message: string, alertType: string, timeout?: number) => void;
	register: (name: string, email: string, password: string) => void;
}

const Register = ({ setAlert, register }: IRegisterProps) => {
	const nameRef = React.useRef<HTMLInputElement>(null);
	const emailRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);
	const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (nameRef && nameRef.current) {
			nameRef.current.focus();
		}
	}, []);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (
			!nameRef.current ||
			!emailRef.current ||
			!passwordRef.current ||
			!confirmPasswordRef.current
		)
			return;
		e.preventDefault();

		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			setAlert('Les mots de passes ne correspondent pas', 'danger');
		} else {
			register(
				nameRef.current.value,
				emailRef.current.value,
				passwordRef.current.value
			);
			history.push('/');
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
						name='name'
						required
						ref={nameRef}
					></input>
				</div>
				<div className='regAuth__field'>
					<input
						type='email'
						placeholder='Email *'
						name='email'
						required
						ref={emailRef}
					></input>
				</div>
				<div className='regAuth__field'>
					<input
						type='password'
						placeholder='Mot de passe *'
						name='password'
						required
						ref={passwordRef}
					></input>
				</div>
				<div className='regAuth__field'>
					<input
						type='password'
						placeholder='Confirmation du mot de passe *'
						name='password2'
						required
						ref={confirmPasswordRef}
					></input>
				</div>
				<input
					type='submit'
					className='regAuth__submit'
					value='Continuer'
				></input>
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

export default connect<IRegisterProps>(null, { setAlert, register })(Register);
