import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import classes from './LayoutFilms.module.css';
import FilmsList from '../../../components/FilmsList/FilmsList';
import FilmDetails from '../../../components/FilmDetails/FilmDetails';

class LayoutFilms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posterClicked: [],
        };
    }

    componentDidMount() {
        if (this.props.posterClicked) {
            this.setState({ posterClicked: this.props.posterClicked });
        }
        window.scroll(0, 0);
    }

    componentDidUpdate() {
        window.scroll(0, 0);
    }

    handlePosterClick = filmSpecs => {
        this.setState({ posterClicked: filmSpecs });
    };

    render() {
        return (
            <Fragment>
                <div className={classes.Container}>
                    <Route
                        path='/films'
                        exact
                        render={() => (
                            <FilmsList
                                filmsSpecs={this.props.filmsSpecs}
                                onPosterClick={this.handlePosterClick}
                            />
                        )}
                    />
                    <Route
                        path='/films/:title'
                        render={props => <FilmDetails filmSpecs={this.state.posterClicked} {...props} />}
                    />
                </div>
            </Fragment>
        );
    }
}

export default LayoutFilms;
