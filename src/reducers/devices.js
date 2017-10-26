import { RECEIVE_DEVICES, UPDATE_DEVICE } from '../actions/index';

const devices = (state = [], action) => {
    switch (action.type) {
    case RECEIVE_DEVICES:
        return action.devices;
    case UPDATE_DEVICE:
        // eslint-disable-next-line arrow-body-style
        return state.map((device) => {
            return device.id !== action.payload.id
                ? device
                : {
                    ...device,
                    ...action.payload,
                };
        });
    default:
        return state;
    }
};

export default devices;
