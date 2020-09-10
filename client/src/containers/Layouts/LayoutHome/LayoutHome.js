import React, { Component, Fragment } from 'react';
import Carousel from '../../../components/Carousel/Carousel';
import FilmsList from '../../../components/FilmsList/FilmsList';
import classes from './LayoutHome.module.css';

class LayoutHome extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    handlePosterClick = filmSpecs => {
        this.props.onPosterClick(filmSpecs);
    };

    render() {
        return (
            <Fragment>
                <div className={classes.Container}>
                    <Carousel filmsSpecs={this.props.filmsSpecs} />
                    <FilmsList filmsSpecs={this.props.filmsSpecs} onPosterClick={this.handlePosterClick} />
                </div>
            </Fragment>
        );
    }
}

export default LayoutHome;
