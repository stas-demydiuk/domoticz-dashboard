import React, {Component} from 'react';
import DevicesGrid from './containers/DevicesGrid';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <DevicesGrid/>
            </div>
        );
    }
}

export default App;
