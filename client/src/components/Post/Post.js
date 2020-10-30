import React from 'react';
import classes from './Post.module.css';
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
            <div className={classes.delete} onClick={handleClick}>
                Supprimer
            </div>
        ) : (
            ''
        );

    return (
        <div className={classes.container}>
            <div className={classes.title}>{title}</div>
            <div className={classes.text}>{text}</div>
            <div className={classes.header}>
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
