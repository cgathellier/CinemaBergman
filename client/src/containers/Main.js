import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import LayoutHome from './Layouts/LayoutHome/LayoutHome';
import LayoutFilms from './Layouts/LayoutFilms/LayoutFilms';
import LayoutBooking from './Layouts/LayoutBooking/LayoutBooking';
import LayoutRegAuth from './Layouts/LayoutRegAuth/LayoutRegAuth';
import Toolbar from '../components/Toolbar/Toolbar';

const filmsSpecs = [
    {
        title: 'Amadeus',
        director: 'Milos Forman',
        duration: '2h53',
        genre: 'Drame/Histoire',
        public: 'Tous publics',
        year: '1984',
        shows: {
            today: '',
        },
    },
    {
        title: 'Blade Runner',
        director: 'Ridley Scott',
        duration: '1h57',
        genre: 'SF/Thriller',
        public: 'Tous publics',
        year: '1982',
        shows: {
            today: '',
        },
    },
    {
        title: "Breakfast at Tiffany's",
        director: 'Blake Edwards',
        duration: '1h55',
        genre: 'Romance/Comédie',
        public: 'Tous publics',
        year: '1961',
        shows: {
            today: '',
        },
    },
    {
        title: 'La Cité de Dieu',
        director: 'Fernando Meirelles et Kátia Lund',
        duration: '2h15',
        genre: 'Drame/Crime',
        public: '-16',
        year: '2002',
        shows: {
            today: '',
        },
    },
];

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmsList: [],
            posterClicked: null,
        };
    }

    componentDidMount() {
        this.setState({ filmsList: filmsSpecs });
    }

    handlePosterClick = filmSpecs => {
        this.setState({ posterClicked: filmSpecs });
    };

    render() {
        return (
            <Fragment>
                <Toolbar />
                <Route
                    path='/'
                    exact
                    render={() => (
                        <LayoutHome
                            filmsSpecs={this.state.filmsList}
                            onPosterClick={this.handlePosterClick}
                        />
                    )}
                />
                <Route
                    path='/films'
                    render={props => (
                        <LayoutFilms
                            filmsSpecs={this.state.filmsList}
                            posterClicked={this.state.posterClicked}
                            {...props}
                        />
                    )}
                />
                <Route path='/reservation' component={LayoutBooking} />
                <Route path='/register' render={() => <LayoutRegAuth regOrAuth='register' />} />
                <Route path='/login' render={() => <LayoutRegAuth regOrAuth='login' />} />
            </Fragment>
        );
    }
}

export default Main;
