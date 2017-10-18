import * as api from '../domoticzApi';

export const STATE_ON = 'On';
export const STATE_OFF = 'Off';

export const ADD_WIDGET = 'ADD_WIDGET';
export const addWidget = (page, layout, widgetType, widgetStyle, deviceId) => ({
    type: ADD_WIDGET,
    payload: {
        page,
        widget: {
            layout,
            deviceId,
            type: widgetType,
            style: widgetStyle,
        },
    },
});

export const UPDATE_WIDGET = 'UPDATE_WIDGET';
export const updateWidget = (page, widgetIndex, widgetType, widgetStyle, deviceId) => ({
    type: UPDATE_WIDGET,
    payload: {
        page,
        widgetIndex,
        widgetType,
        widgetStyle,
        deviceId,
    },
});

export const REMOVE_WIDGET = 'REMOVE_WIDGET';
export const removeWidget = (page, widgetIndex) => ({
    type: REMOVE_WIDGET,
    payload: {
        page,
        widgetIndex,
    },
});

export const addPage = (roomId, widgets) => ({
    type: 'ADD_PAGE',
    payload: {
        roomId,
        widgets,
    },
});

export const updateLayout = (page, layout) => ({
    type: 'UPDATE_LAYOUT',
    payload: {
        page,
        layout,
    },
});

export const receiveDevices = devices => ({
    type: 'RECEIVE_DEVICES',
    devices,
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
