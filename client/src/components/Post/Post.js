import React from 'react';
import classes from './Post.module.css';

const Post = () => {
    return (
        <div className={classes.container}>
            <div>username</div>
            <div>date</div>
            <div>message</div>
            <div>croix pour supprimer le message</div>
        </div>
    );
};

export default Post;
