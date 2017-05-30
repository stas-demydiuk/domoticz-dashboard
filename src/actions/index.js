import axios from 'axios';
import domoticzAdapter from '../domoticzAdapter';

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

export const loadDomoticzDevices = () => axios
    .get('http://192.168.1.15:8090/json.htm', {
        params: {
            type: 'devices',
            used: true,
        },
    })
    .then((response) => {
        const devices = response.data.result || [];
        return domoticzAdapter(devices);
    });

export const fetchDevices = () => (dispatch) => {
    loadDomoticzDevices().then((devices) => {
        dispatch(receiveDevices(devices));
    });
};

export const refreshDevices = () => (dispatch) => {
    dispatch({ type: 'REFRESH_START' });

    loadDomoticzDevices().then((devices) => {
        dispatch(receiveDevices(devices));
        dispatch({ type: 'REFRESH_FINISH' });
    });
};

export const setDeviceState = (id, value) => (dispatch) => {
    axios.get('http://192.168.1.15:8090/json.htm', {
        params: {
            type: 'command',
            param: 'switchlight',
            idx: id,
            switchcmd: value,
        },
    })
        .then(() => {
            dispatch(fetchDevices());
        });
};

export const setDeviceLevel = (id, value) => (dispatch) => {
    axios.get('http://192.168.1.15:8090/json.htm', {
        params: {
            type: 'command',
            param: 'switchlight',
            idx: id,
            switchcmd: 'Set Level',
            level: value,
        },
    })
        .then(() => {
            dispatch(fetchDevices());
        });
};

export const setDeviceColor = (id, color) => (dispatch) => {
    axios.get('http://192.168.1.15:8090/json.htm', {
        params: {
            type: 'command',
            param: 'setcolbrightnessvalue',
            idx: id,
            hue: color.hsv.h,
            brightness: parseInt(color.hsv.v * 100, 10),
            iswhite: color.rgb.r === 255 && color.rgb.g === 255 && color.rgb.b === 255,
        },
    })
        .then(() => {
            dispatch(fetchDevices());
        });
};
