import React from 'react';
import classes from './Post.module.css';
import Moment from 'react-moment';

const Post = props => {
    const { name, date, message } = props.post;

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div>Posté par {name}</div>
                <div>
                    Le <Moment format='DD/MM/YYYY'>{date}</Moment> à <Moment format='mm:HH'>{date}</Moment>
                </div>
            </div>
            <div className={classes.message}>{message}</div>
            <div className={classes.delete}>Supprimer</div>
        </div>
    );
};

export default Post;
