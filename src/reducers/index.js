import { combineReducers } from 'redux';
import devices from './devices';

const dashboardApp = combineReducers({
    devices
});

export default dashboardApp