const devices = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_DEVICES':
            return action.devices;
        default:
            return state;
    }
};

export default devices;
