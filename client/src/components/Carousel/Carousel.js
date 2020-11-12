import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Arrows from './Arrows/Arrows';

import classes from './Carousel.module.css';
import Slider from './Slider/Slider';
import Slide from './Slide/Slide';
import Dot from './Dots/Dot';

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
        initialOffset: 0,
        offset: null,
        swipping: false,
    });

    const {
        activeSlide,
        transition,
        translate,
        width,
        slides,
        initialOffset,
        offset,
        swipping,
    } = state;

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

        if (!swipping) {
            const interval = setInterval(play, 6000);
            window.addEventListener('transitionend', transitionEvent);
            window.addEventListener('resize', resize);
            return () => {
                clearInterval(interval);
                window.removeEventListener('transitionend', transitionEvent);
                window.removeEventListener('resize', resize);
            };
        } else {
            window.addEventListener('transitionend', transitionEvent);
            window.addEventListener('resize', resize);
            return () => {
                window.removeEventListener('transitionend', transitionEvent);
                window.removeEventListener('resize', resize);
            };
        }
    }, [swipping]);

    useEffect(() => {
        if (transition === 0) {
            setState({ ...state, transition: 0.5 });
        }
    }, [transition]);

    const handleResize = () => {
        setState({
            ...state,
            width: widthRef.current.offsetWidth,
            translate: widthRef.current.offsetWidth,
            transition: 0,
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

        if (!swipping) {
            setState({
                ...state,
                slides: slidesArr,
                transition: 0,
                translate: widthRef.current.offsetWidth,
            });
        }
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

    const handleTouchStart = e => {
        setState({
            ...state,
            initialOffset: offset + e.targetTouches[0].clientX,
            swipping: true,
        });
    };

    // const handleTouchMove = e => {
    //     if (swipping) {
    //         const deltaX =
    //             initialOffset - e.targetTouches[0].clientX + widthRef.current.offsetWidth;
    //         setState({
    //             ...state,
    //             offset: e.targetTouches[0].clientX,
    //             translate: deltaX,
    //         });
    //     }
    // };

    const handleTouchEnd = e => {
        const calc = e.changedTouches[0].clientX - initialOffset;
        const pourcentage = (width / 100) * 25;
        if (calc < 0 && Math.abs(calc) > pourcentage) {
            setState({
                ...state,
                translate: 2 * widthRef.current.offsetWidth,
                offset: 0,
                initialOffset: 0,
                swipping: false,
                activeSlide: activeSlide === films.length - 1 ? 0 : activeSlide + 1,
            });
        } else if (calc > 0 && calc > pourcentage) {
            setState({
                ...state,
                translate: 0,
                offset: 0,
                initialOffset: 0,
                swipping: false,
                activeSlide: activeSlide === 0 ? films.length - 1 : activeSlide - 1,
            });
        } else {
            setState({
                ...state,
                translate: widthRef.current.offsetWidth,
                initialOffset: 0,
                offset: 0,
                swipping: false,
            });
        }
    };

    const handleMouseDown = e => {
        e.preventDefault();
        setState({
            ...state,
            initialOffset: offset + e.clientX,
            swipping: true,
        });
    };
    // const handleMouseMove = e => {
    // if (swipping) {
    //     const deltaX = initialOffset - e.clientX + widthRef.current.offsetWidth;
    //     setState({
    //         ...state,
    //         offset: e.clientX,
    //         translate: deltaX,
    //     });
    // }
    // };

    const handleMouseUp = e => {
        e.preventDefault();
        const calc = e.clientX - initialOffset;
        const pourcentage = (width / 100) * 25;
        if (calc < 0 && Math.abs(calc) > pourcentage) {
            setState({
                ...state,
                translate: 2 * widthRef.current.offsetWidth,
                offset: 0,
                initialOffset: 0,
                swipping: false,
                activeSlide: activeSlide === films.length - 1 ? 0 : activeSlide + 1,
            });
        } else if (calc > 0 && calc > pourcentage) {
            setState({
                ...state,
                translate: 0,
                offset: 0,
                initialOffset: 0,
                swipping: false,
                activeSlide: activeSlide === 0 ? films.length - 1 : activeSlide - 1,
            });
        } else {
            setState({
                ...state,
                translate: widthRef.current.offsetWidth,
                initialOffset: 0,
                offset: 0,
                swipping: false,
            });
        }
    };

    const handleMouseLeave = e => {
        if (swipping) {
            handleMouseUp(e);
        }
    };

    return (
        <div className={classes.Container} ref={widthRef}>
            <Slider width={width * 3} translate={translate} transition={transition}>
                {slides.map((slide, index) => (
                    <Slide
                        filmData={slide}
                        key={index}
                        width={width}
                        onTouchStart={handleTouchStart}
                        // onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        // onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </Slider>
            <Arrows
                direction='left'
                handleClick={() => previousSlide()}
                display={swipping || window.innerWidth < 1200 ? 'none' : 'flex'}
            />
            <Arrows
                direction='right'
                handleClick={() => nextSlide()}
                display={swipping || window.innerWidth < 1200 ? 'none' : 'flex'}
            />
            <div className={classes.dotsContainer}>
                <div className={classes.dots}>
                    {films.map((film, index) => (
                        <Dot
                            key={index}
                            index={index}
                            selected={activeSlide === index ? 'true' : 'false'}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
