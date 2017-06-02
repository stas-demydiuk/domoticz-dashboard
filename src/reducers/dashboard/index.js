import { combineReducers } from 'redux';
import pages from './pages';
import activePage from './activePage';

const dashboard = combineReducers({
    pages,
    activePage,
});

export default dashboard;
