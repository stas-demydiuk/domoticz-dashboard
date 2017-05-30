import { combineReducers } from 'redux';
import devices from './devices';
import dashboard from './dashboard';

const dashboardApp = combineReducers({
    dashboard,
    devices,
});

export default dashboardApp;
