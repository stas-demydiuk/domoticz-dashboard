const device = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_DEVICE':
            if (state.id !== action.id) {
                return state
            }

            return Object.assign({}, state, {
                completed: !state.completed
            });

        default:
            return state
    }
};

const devices = (state = [], action) => {
    switch (action.type) {
        case 'TOGGLE_DEVICE':
            return state.map(d =>
                device(d, action)
            );
        case 'RECEIVE_DEVICES':
            return action.devices;
        default:
            return state
    }
};

export default devices;