import React from 'react';
import { Route } from 'react-router';

import DevicesGrid from './containers/DevicesGrid';

import './App.css';

export default function App() {
    return (
        <div className="App">
            <div>
                <Route exact path="/" component={DevicesGrid} />
                <Route
                    path="/settings"
                    render={props => (
                        <DevicesGrid {...props} editMode />
                    )}
                />
            </div>
        </div>
    );
}
