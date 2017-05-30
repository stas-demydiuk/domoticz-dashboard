import { combineReducers } from 'redux';
import devices from './devices';
import dashboard from './dashboard';
import deviceLoading from './deviceLoading';

const dashboardApp = combineReducers({
    dashboard,
    devices,
    deviceLoading,
});

export default dashboardApp;
