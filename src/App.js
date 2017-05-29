import React, {Component} from 'react';
import {Route} from 'react-router'
import DevicesGrid from './containers/DevicesGrid';
import Settings from './containers/Settings';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <Route exact path="/" component={DevicesGrid}/>
                    <Route path="/settings" render={props => (
                        <DevicesGrid {...props} editMode={true}/>
                    )}/>
                </div>
            </div>
        );
    }
}

export default App;
