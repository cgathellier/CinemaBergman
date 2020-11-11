import React from 'react';
import Carousel from '../../../components/Carousel/Carousel';
import FilmsList from '../../../components/FilmsList/FilmsList';
import classes from './LayoutHome.module.css';

const images = [
    'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
    'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80',
];

const LayoutHome = props => {
    const handlePosterClick = filmInfos => {
        props.onClickPoster(filmInfos);
    };

    return (
        <div className={classes.Container}>
            <Carousel films={props.filmsList} />
            <FilmsList
                filmsList={props.filmsList}
                onClickPoster={handlePosterClick}
                path='/films/'
                presentation="À l'affiche"
            />
        </div>
    );
};

export default LayoutHome;
