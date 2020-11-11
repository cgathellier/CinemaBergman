import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Arrows from './Arrows/Arrows';

import classes from './Carousel.module.css';
import Slider from './Slider/Slider';
import Slide from './Slide/Slide';
import Dots from './Dots/Dots';

const Carousel = ({ films }) => {
    const lastSlide = films[films.length - 1];
    const firstSlide = films[0];
    const secondSlide = films[1];

    const nextSlideRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();
    const widthRef = useRef();

    const [state, setState] = useState({
        activeSlide: 0,
        transition: 0.5,
        translate: 0,
        width: 0,
        slides: [films[films.length - 1], films[0], films[1]],
    });

    const { activeSlide, transition, translate, width, slides } = state;

    const handleResize = () => {
        setState({
            ...state,
            translate: widthRef.current.offsetWidth,
            transition: 0,
            width: widthRef.current.offsetWidth,
        });
    };

    const setupSlides = () => {
        let slidesArr = [];
        if (activeSlide === films.length - 1) {
            // le film affiché est le dernier de la liste
            slidesArr = [films[films.length - 2], films[films.length - 1], films[0]];
        } else if (activeSlide === 0) {
            // le film affiché est le premier de la liste
            slidesArr = [films[films.length - 1], films[0], films[1]];
        } else {
            // le film affiché est entre le premier et le dernier de la liste
            slidesArr = films.slice(activeSlide - 1, activeSlide + 2);
        }

        setState({
            ...state,
            slides: slidesArr,
            transition: 0,
            translate: widthRef.current.offsetWidth,
        });
    };

    const nextSlide = () => {
        setState({
            ...state,
            activeSlide: activeSlide === films.length - 1 ? 0 : activeSlide + 1,
            translate: translate + width,
        });
    };
    const previousSlide = () => {
        setState({
            ...state,
            activeSlide: activeSlide === 0 ? films.length - 1 : activeSlide - 1,
            translate: 0,
        });
    };

    useLayoutEffect(() => {
        if (widthRef.current) {
            setState({
                ...state,
                translate: widthRef.current.offsetWidth,
                width: widthRef.current.offsetWidth,
            });
        }
    }, []);

    useEffect(() => {
        setState({
            ...state,
            slides: [lastSlide, firstSlide, secondSlide],
            translate: widthRef.current.offsetWidth,
            width: widthRef.current.offsetWidth,
        });
    }, [films]);

    useEffect(() => {
        nextSlideRef.current = nextSlide;
        transitionRef.current = setupSlides;
        resizeRef.current = handleResize;
    });

    useEffect(() => {
        const play = () => {
            nextSlideRef.current();
        };

        const transitionEvent = e => {
            if (e.target.className.includes('slider')) {
                transitionRef.current();
            }
        };

        const resize = () => {
            resizeRef.current();
        };

        const interval = setInterval(play, 6000);
        const transitionListener = window.addEventListener('transitionend', transitionEvent);
        const onResize = window.addEventListener('resize', resize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('transitionend', transitionListener);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        if (transition === 0) {
            setState({ ...state, transition: 0.5 });
        }
    }, [transition]);

    return (
        <div className={classes.Container} ref={widthRef}>
            <Slider width={width * 3} translate={translate} transition={transition}>
                {slides.map((slide, index) => (
                    <Slide filmData={slide} key={index} width={width} />
                ))}
            </Slider>
            <Arrows direction='left' handleClick={() => previousSlide()} />
            <Arrows direction='right' handleClick={() => nextSlide()} />
            <div className={classes.dotsContainer}>{/* {dots} */}</div>
        </div>
    );
};

export default Carousel;
