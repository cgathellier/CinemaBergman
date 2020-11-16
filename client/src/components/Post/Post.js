import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Post = props => {
    const { name, date, text, _id, title } = props.post;

    const handleClick = () => {
        props.onClick(_id);
    };

    const deleteBtn =
        props.isAdmin || props.name === name ? (
            <div className='post__delete' onClick={handleClick}>
                Supprimer
            </div>
        ) : (
            ''
        );

    return (
        <div className='post__container'>
            <div className='post__title'>{title}</div>
            <div className='post__text'>{text}</div>
            <div className='post__header'>
                <div>{name}</div>
                <div>
                    <Moment format='DD/MM/YYYY'>{date}</Moment> à{' '}
                    <Moment format='HH:mm'>{date}</Moment>
                </div>
            </div>
            {deleteBtn}
        </div>
    );
};

Post.propTypes = {
    name: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    name: state.auth.name,
    isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(Post);
