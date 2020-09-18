import React, { useEffect } from 'react';
import classes from './Slide.module.css';
import axios from 'axios';

const Slide = props => {
    let snap;
    useEffect(() => {
        const filename = props.filmSnap.split('/images/')[1];
        console.log(filename);
        const getImg = async () => {
            const res = await axios.get(`http://localhost:5000/api/films/images/${filename}`);
            console.log(res);
        };
        getImg();
    }, []);

    // const snapPath = require('../../../../../images/' + props.snap + '.jpeg');
    // const snapPath = await axios.get(`/api/films/${props.filmDisplayed._id}`);

    return (
        <div className={classes.Slide}>
            <img src={snap} alt={props.title} className={classes.image} />
            <div className={classes.grad}>
                <div className={classes.presentation}>
                    <h2>Nouveauté</h2>
                    <p>{props.title}</p>
                </div>
            </div>
        </div>
    );
};

export default Slide;
