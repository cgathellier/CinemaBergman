import React from 'react';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';

const LayoutRegAuth = props => {
    const form = props.regOrAuth === 'register' ? <Register {...props} /> : <Login {...props} />;

    return (
        <div className='RegAuthLayout__container'>
            <div className='RegAuthLayout__illustration'>
                <img
                    src='https://i.ibb.co/jZSq9gq/cinema.jpg'
                    alt='Grande salle du Cinema Bergman'
                    className='RegAuthLayout__imgCinema'
                />
            </div>
            <div className='RegAuthLayout__form'>{form}</div>
        </div>
    );
};

export default LayoutRegAuth;
