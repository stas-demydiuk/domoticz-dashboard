const deviceLoading = (state = false, action) => {
    switch (action.type) {
    case 'REFRESH_START':
        return true;
    case 'REFRESH_FINISH':
        return false;
    default:
        return state;
    }
};

export default deviceLoading;
