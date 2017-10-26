import React from 'react';
import ReactDOM from 'react-dom';
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
import { addPage } from './actions/index';
import { config as dashboardConfig } from './dashboard';
import initMqtt from './mqtt';
import { setDomoticzConfig } from './domoticzApi';

const history = createHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(dashboardApp),
    composeEnhancers(applyMiddleware(routerMiddleware(history), ReduxThunk)),
);

setDomoticzConfig(window.config.domoticz);

if (window.config.mqtt) {
    initMqtt(store, window.config.mqtt);
}

store.dispatch(addPage(0, dashboardConfig));
store.dispatch(addPage(0, dashboardConfig));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
