import React, { Component } from 'react';
import FilmItem from './FilmItem/FilmItem';
import classes from './FilmsList.module.css';
import Modal from '../Modal/Modal';


class FilmsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmSelectedSpecs: null,
            modalShow: false,
        }
    }

    handleClickSeance = (filmSpecs) => {
        this.setState({ filmSelectedSpecs: filmSpecs, modalShow: true })
    }

    handleClickBackdrop = () => {
        this.setState({ modalShow: false })
    }

    handleClickPoster = (filmSpecs) => {
        this.props.onPosterClick(filmSpecs)
    }


    render() {
        let filmItems;
        if (this.props.filmsSpecs) {
            let filmSpecs = this.props.filmsSpecs;
            filmItems = filmSpecs.map((film, index) => {
                return (
                    <FilmItem genre={film.genre} title={film.title} onClickSeances={this.handleClickSeance} fullSpecs={film} key={film.title + index} onClickPoster={this.handleClickPoster} />
                )
            })
        }


        return (
            <div className={classes.container}>
                <div className={classes.presentation}>Actuellement au cinéma</div>
                <div className={classes.FilmsList}>
                    {filmItems}
                </div>
                <Modal show={this.state.modalShow} specs={this.state.filmSelectedSpecs} onClickBackdrop={this.handleClickBackdrop} />
            </div>
        )
    }
}



export default FilmsList;