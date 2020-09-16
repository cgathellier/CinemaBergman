import React, { useEffect, useState } from 'react';
import Arrows from './Arrows/Arrows';

import classes from './Carousel.module.css';
import Slide from './Slide/Slide';
import Dots from './Dots/Dots';

const Carousel = props => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [filmsList, setFilmsList] = useState([]);

    useEffect(() => {
        setFilmsList(props.filmsSpecs);
        setIntervalFunction();
        return () => clearIntervalFunction();
    }, [slideIndex]);

    let interval;

    let filmDisplayed;
    let currentSlide = null;
    let dots;
    if (props.filmsSpecs) {
        filmDisplayed = props.filmsSpecs[slideIndex];
        if (filmDisplayed) {
            currentSlide = <Slide title={filmDisplayed.title} />;
            dots = props.filmsSpecs.map((film, index) => {
                return (
                    <Dots
                        key={index}
                        selected={index === slideIndex ? 'true' : 'false'}
                        index={index}
                        handleClickDot={() => clickDot()}
                    />
                );
            });
        }
    }

    const previousFilm = () => {
        clearIntervalFunction();
        const lastIndex = props.filmsSpecs.length - 1;
        const newIndex = slideIndex === 0 ? lastIndex : slideIndex - 1;
        setSlideIndex(newIndex);
        setIntervalFunction();
    };

    const nextFilm = () => {
        clearIntervalFunction();
        const lastIndex = props.filmsSpecs.length - 1;
        const newIndex = slideIndex === lastIndex ? 0 : slideIndex + 1;
        setSlideIndex(newIndex);
        setIntervalFunction();
    };

    const clickDot = index => {
        clearIntervalFunction();
        setSlideIndex(index);
        setIntervalFunction();
    };

    const setIntervalFunction = () => {
        interval = setInterval(() => {
            const lastIndex = props.filmsSpecs.length - 1;
            const newIndex = slideIndex === lastIndex ? 0 : slideIndex + 1;
            setSlideIndex(newIndex);
        }, 5000);
    };

    const clearIntervalFunction = () => {
        clearInterval(interval);
    };

    return (
        <div className={classes.Container}>
            <Arrows direction='left' handleClick={() => previousFilm()} />
            <Arrows direction='right' handleClick={() => nextFilm()} />
            {currentSlide}
            <div className={classes.dotsContainer}>{dots}</div>
        </div>
    );
};

export default Carousel;
