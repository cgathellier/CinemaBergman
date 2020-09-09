import React, { Component } from 'react';
import Arrows from './Arrows/Arrows';

import classes from './Carousel.module.css';
import Slide from './Slide/Slide';
import Dots from './Dots/Dots';


class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            filmsList: [],
        }
        this.interval = null;
    }

    componentDidMount() {
        this.setState({ filmsList: this.props.filmsSpecs });
        this.setIntervalFunction();
    }

    componentWillUnmount() {
        this.clearIntervalFunction();
    }

    previousFilm = () => {
        this.clearIntervalFunction();
        const lastIndex = this.props.filmsSpecs.length - 1;
        const { slideIndex } = this.state;
        const shouldIndexReset = slideIndex === 0;
        const newIndex = shouldIndexReset ? lastIndex : slideIndex - 1;
        this.setState({ slideIndex: newIndex })
        this.setIntervalFunction();
    }

    nextFilm = () => {
        this.clearIntervalFunction();
        const lastIndex = this.props.filmsSpecs.length - 1;
        const { slideIndex } = this.state;
        const shouldIndexReset = slideIndex === lastIndex;
        const newIndex = shouldIndexReset ? 0 : slideIndex + 1;
        this.setState({ slideIndex: newIndex })
        this.setIntervalFunction();
    }

    clickDot = (index) => {
        this.clearIntervalFunction();
        this.setState({ slideIndex: index })
        this.setIntervalFunction();
    }

    setIntervalFunction = () => {
        this.interval = setInterval(() => {
            const lastIndex = this.props.filmsSpecs.length - 1;
            const { slideIndex } = this.state;
            const shouldIndexReset = slideIndex === lastIndex;
            const newIndex = shouldIndexReset ? 0 : slideIndex + 1;
            this.setState({ slideIndex: newIndex })
        }, 5000)
    }

    clearIntervalFunction = () => {
        clearInterval(this.interval)
    }



    render() {
        let filmDisplayed;
        let currentSlide = null;
        let dots;
        if (this.props.filmsSpecs) {
            filmDisplayed = this.props.filmsSpecs[this.state.slideIndex];
            if (filmDisplayed) {
                currentSlide = <Slide title={filmDisplayed.title} />
                dots = this.props.filmsSpecs.map((film, index) => {
                    return (
                        <Dots key={index} selected={index === this.state.slideIndex ? "true" : "false"} index={index} handleClickDot={this.clickDot} />
                    )
                })
            }
        }




        return (
            <div className={classes.Container}>
                <Arrows direction="left" handleClick={this.previousFilm} />
                <Arrows direction="right" handleClick={this.nextFilm} />
                {currentSlide}
                <div className={classes.dotsContainer}>
                    {dots}
                </div>
            </div>
        )
    }
}


export default Carousel;