import React, { useContext } from 'react';
import classes from './Post.module.css';
import Moment from 'react-moment';
import { IsAdminContext, NameContext } from '../../containers/Main';

const Post = props => {
    const { name, date, text, _id } = props.post;

    const handleClick = () => {
        props.onClick(_id);
    };

    const nameContext = useContext(NameContext);
    const isAdmin = useContext(IsAdminContext);
    const deleteBtn =
        isAdmin || nameContext == name ? (
            <div className={classes.delete} onClick={handleClick}>
                Supprimer
            </div>
        ) : (
            ''
        );

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div>Posté par {name}</div>
                <div>
                    Le <Moment format='DD/MM/YYYY'>{date}</Moment> à <Moment format='HH:mm'>{date}</Moment>
                </div>
            </div>
            <div className={classes.text}>{text}</div>
            {deleteBtn}
        </div>
    );
};

export default Post;
