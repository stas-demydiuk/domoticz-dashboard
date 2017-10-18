import { combineReducers } from 'redux';
import devices from './devices';
import dashboard from './dashboard';
import deviceLoading from './deviceLoading';
import rooms from './rooms';
import translations from './translations';

const dashboardApp = combineReducers({
    dashboard,
    devices,
    deviceLoading,
    rooms,
    translations,
});

export default dashboardApp;
