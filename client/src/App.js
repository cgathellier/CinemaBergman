import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './containers/Main';

function App() {
    return (
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    );
}

export default App;
