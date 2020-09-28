import React from 'react';
import classes from './Post.module.css';
import Moment from 'react-moment';

const Post = props => {
    const { name, date, message, _id } = props.post;

    const handleClick = () => {
        props.onClick(_id);
    };
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div>Posté par {name}</div>
                <div>
                    Le <Moment format='DD/MM/YYYY'>{date}</Moment> à <Moment format='mm:HH'>{date}</Moment>
                </div>
            </div>
            <div className={classes.message}>{message}</div>
            <div className={classes.delete} onClick={handleClick}>
                Supprimer
            </div>
        </div>
    );
};

export default Post;
