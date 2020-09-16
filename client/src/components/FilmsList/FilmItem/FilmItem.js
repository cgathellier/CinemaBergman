import React from 'react';
import classes from './FilmItem.module.css';
import { Link } from 'react-router-dom';

const filmItem = ({ filmInfos, onClickPoster }) => {
    const imgPath = require('../../../../../images/posters/' + filmInfos.title + '.jpeg');

    const handleClickPoster = () => {
        onClickPoster(filmInfos);
    };

    return (
        <div className={classes.FilmItem}>
            <div className={classes.imgContainer}>
                <Link to={'/films/' + filmInfos._id}>
                    <img
                        src={imgPath}
                        alt={filmInfos.title}
                        className={classes.Poster}
                        onClick={handleClickPoster}
                    />
                </Link>
                <div className={classes.genre} title={filmInfos.genre}>
                    {filmInfos.genre}
                </div>
            </div>
            <div className={classes.title} title={filmInfos.title}>
                {filmInfos.title}
            </div>
        </div>
    );
};
// const filmItem = props => {
//     const imgPath = require('../../../../../images/posters/' + props.title + '.jpeg');

//     const handleClickPoster = () => {
//         props.onClickPoster(props.filmInfos);
//     };

//     return (
//         <div className={classes.FilmItem}>
//             <div className={classes.imgContainer}>
//                 <Link to={'/films/' + props.title}>
//                     <img
//                         src={imgPath}
//                         alt={props.title}
//                         className={classes.Poster}
//                         onClick={handleClickPoster}
//                     />
//                 </Link>
//                 <div className={classes.genre} title={props.genre}>
//                     {props.genre}
//                 </div>
//             </div>
//             <div className={classes.title} title={props.title}>
//                 {props.title}
//             </div>
//         </div>
//     );
// };

export default filmItem;
