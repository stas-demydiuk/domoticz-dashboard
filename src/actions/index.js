import * as api from '../domoticzApi';

export {
    ADD_WIDGET,
    UPDATE_WIDGET,
    REMOVE_WIDGET,
    ADD_PAGE,
    UPDATE_LAYOUT,
    addWidget,
    updateWidget,
    removeWidget,
    addPage,
    saveLayout,
} from './dashboard';


export const STATE_ON = 'On';
export const STATE_OFF = 'Off';

export const RECEIVE_DEVICES = 'RECEIVE_DEVICES';
export const receiveDevices = devices => ({
    type: RECEIVE_DEVICES,
    devices,
});

export const UPDATE_DEVICE = 'UPDATE_DEVICE';
export const updateDevice = (id, label, value, isActive) => ({
    type: UPDATE_DEVICE,
    payload: {
        id,
        label,
        value,
        isActive,
    },
});

export const receiveRooms = rooms => ({
    type: 'RECEIVE_ROOMS',
    payload: rooms,
});

export const fetchDevices = () => (dispatch) => {
    api.loadDevices().then((devices) => {
        dispatch(receiveDevices(devices));
    });
};

export const fetchRooms = () => (dispatch) => {
    api.loadRooms().then((rooms) => {
        dispatch(receiveRooms(rooms));
    });
};

export const refreshDevices = () => (dispatch) => {
    dispatch({ type: 'REFRESH_START' });

    api.loadDevices().then((devices) => {
        dispatch(receiveDevices(devices));
        dispatch({ type: 'REFRESH_FINISH' });
    });
};

export const setDeviceState = (id, value) => (dispatch) => {
    api.setDeviceSate(id, value)
        .then(() => {
            dispatch(fetchDevices());
        });
};

export const setDeviceLevel = (id, value) => (dispatch) => {
    api.setDeviceLevel(id, value)
        .then(() => {
            dispatch(fetchDevices());
        });
};

export const setDeviceColor = (id, color) => (dispatch) => {
    api.setDeviceColor(id, color)
        .then(() => {
            dispatch(fetchDevices());
        });
};
