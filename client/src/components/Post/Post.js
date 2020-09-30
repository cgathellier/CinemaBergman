import React, { useContext } from 'react';
import classes from './Post.module.css';
import Moment from 'react-moment';
import { IsAdminContext } from '../../containers/Main';

const Post = props => {
    const { name, date, message, _id } = props.post;

    const isAdmin = useContext(IsAdminContext);
    const deleteBtn = isAdmin ? (
        <div className={classes.delete} onClick={handleClick}>
            Supprimer
        </div>
    ) : (
        ''
    );

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
            {deleteBtn}
        </div>
    );
};

export default Post;
