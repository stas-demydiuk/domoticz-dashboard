import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import 'normalize.css/normalize.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'rc-slider/assets/index.css';

import dashboardApp from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import { addPage, fetchDevices, fetchRooms } from './actions';
import initMqtt from './mqtt';
import { setDomoticzConfig } from './domoticzApi';

const history = createHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(dashboardApp),
    composeEnhancers(applyMiddleware(routerMiddleware(history), ReduxThunk)),
);

axios.get('/config.json').then((response) => {
    const serverConfig = response.data.server;
    const dashboardConfig = response.data.dashboard;

    if (serverConfig.domoticz) {
        setDomoticzConfig(serverConfig.domoticz);
        store.dispatch(fetchDevices());
        store.dispatch(fetchRooms());
    }

    if (serverConfig.mqtt) {
        initMqtt(store, serverConfig.mqtt);
    }

    dashboardConfig.forEach((page) => {
        store.dispatch(addPage(page.roomId, page.widgets));
    });
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
