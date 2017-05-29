import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'

import dashboardApp from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css/normalize.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'font-awesome/css/font-awesome.css'
import 'rc-slider/assets/index.css';
import './index.css';

const history = createHistory();

let store = createStore(
    connectRouter(history)(dashboardApp),
    compose(applyMiddleware(routerMiddleware(history), ReduxThunk))
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
