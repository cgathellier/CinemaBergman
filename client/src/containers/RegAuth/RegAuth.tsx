import * as React from 'react';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { login } from '../../actions/auth';

interface IRegAuthProps {
	regOrAuth: string;
}

const RegAuth = ({ regOrAuth }: IRegAuthProps) => (
	<div className='RegAuthLayout__container'>
		<div className='RegAuthLayout__illustration'>
			<img
				src='https://i.ibb.co/jZSq9gq/cinema.jpg'
				alt='Grande salle du Cinema Bergman'
				className='RegAuthLayout__imgCinema'
			/>
		</div>
		<div className='RegAuthLayout__form'>
			{regOrAuth === 'register' ? (
				<Register setAlert={setAlert} register={register} />
			) : (
				<Login login={login} />
			)}
		</div>
	</div>
);

export default RegAuth;
