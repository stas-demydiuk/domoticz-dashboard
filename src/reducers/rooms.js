const rooms = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_ROOMS':
            return action.payload;
        default:
            return state;
    }
};

export default rooms;
