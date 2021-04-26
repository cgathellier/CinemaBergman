import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

interface ILoginProps {
	login: (email: string, password: string) => void;
}

export const Login = ({ login }: ILoginProps) => {
	const emailRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (emailRef && emailRef.current) {
			emailRef.current.focus();
		}
	}, []);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!emailRef.current || !passwordRef.current) return;
		e.preventDefault();
		login(emailRef.current.value, passwordRef.current.value);
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
						name='email'
						required
						ref={emailRef}
					></input>
				</div>
				<div className='regAuth__field'>
					<input
						type='password'
						placeholder='Mot de passe'
						name='password'
						required
						ref={passwordRef}
					></input>
				</div>
				<button type='submit' className='regAuth__submit'>
					Connexion
				</button>
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

export default connect<ILoginProps>(null, { login })(Login);
