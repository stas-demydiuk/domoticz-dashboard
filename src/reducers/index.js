import { combineReducers } from 'redux';
import devices from './devices';
import dashboard from './dashboard';
import deviceLoading from './deviceLoading';
import rooms from './rooms';

const dashboardApp = combineReducers({
    dashboard,
    devices,
    deviceLoading,
    rooms,
});

export default dashboardApp;
