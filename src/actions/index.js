import * as api from '../domoticzApi';

export const removeWidget = id => ({
    type: 'REMOVE_WIDGET',
    id,
});

export const addWidget = data => ({
    type: 'ADD_WIDGET',
    data,
});

export const updateLayout = layout => ({
    type: 'UPDATE_LAYOUT',
    layout,
});

export const receiveDevices = devices => ({
    type: 'RECEIVE_DEVICES',
    devices,
});

export const fetchDevices = () => (dispatch) => {
    api.loadDevices().then((devices) => {
        dispatch(receiveDevices(devices));
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
