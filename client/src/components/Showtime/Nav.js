import React from 'react';

const Nav = props => {
    const navStyle = props.selected === 'true' ? 'nav__selectedContainer' : 'nav__container';

    const handleClick = () => {
        props.handleClick(props.index);
    };
    return (
        <div className={navStyle} onClick={() => handleClick()}>
            <div className='nav__day'>{props.day}</div>
            <div className='nav__date'>{props.date}</div>
            <div className='nav__month'>{props.month}</div>
        </div>
    );
};

export default Nav;
