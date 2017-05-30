import {config} from '../dashboard';

const initialState = JSON.parse(window.localStorage.getItem('dashboard')) || config;

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_WIDGET':
            return [...state, action.data];
        case 'REMOVE_WIDGET':
            return saveState(state.filter((element, index) => index !== action.id));
        case 'UPDATE_LAYOUT':
            return saveState(state.map((element, index) => {
                const {x, y, w, h} = action.layout[index];
                return {...element, layout: {x, y, w, h}}
            }));
        default:
            return state
    }
};

const saveState = (state) => {
    window.localStorage.setItem('dashboard', JSON.stringify(state));
    return state;
};

export default dashboard;