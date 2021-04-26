import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface IAuthModalProps {
	text: string;
}

const AuthModal = ({ text }: IAuthModalProps): JSX.Element => (
	<div className='authModal__container'>
		{text}
		<NavLink to='/login'>
			<div>Se connecter</div>
		</NavLink>
		<NavLink to='/register'>
			<div>Créer un compte</div>
		</NavLink>
	</div>
);

export default AuthModal;
