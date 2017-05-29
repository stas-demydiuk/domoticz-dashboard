import axios from 'axios';
import domoticzAdapter from '../domoticzAdapter'

export const toggleDevice = (id) => {
    return {
        type: 'TOGGLE_DEVICE',
        id
    }
};

export const receiveDevices = (devices) => {
    console.log(devices);

    return {
        type: 'RECEIVE_DEVICES',
        devices
    }
};

export const setDeviceState = (id, value) => {
    return dispatch => {
        axios.get('http://192.168.1.15:8090/json.htm', {
            params: {
                type: 'command',
                param: 'switchlight',
                idx: id,
                switchcmd: value
            }
        })
            .then(response => {
                dispatch(fetchDevices());
            })
    }
};

export const setDeviceLevel = (id, value) => {
    return dispatch => {
        axios.get('http://192.168.1.15:8090/json.htm', {
            params: {
                type: 'command',
                param: 'switchlight',
                idx: id,
                switchcmd: 'Set Level',
                level: value
            }
        })
            .then(response => {
                dispatch(fetchDevices());
            })
    }
};

export const setDeviceColor = (id, color) => {
    return dispatch => {
        axios.get('http://192.168.1.15:8090/json.htm', {
            params: {
                type: 'command',
                param: 'setcolbrightnessvalue',
                idx: id,
                hue: color.hsv.h,
                brightness: parseInt(color.hsv.v * 100),
                iswhite: color.rgb.r === 255 && color.rgb.g === 255 && color.rgb.b === 255
            }
        })
            .then(response => {
                dispatch(fetchDevices());
            })
    }
};

export const fetchDevices = () => {
    return dispatch => {
        axios.get('http://192.168.1.15:8090/json.htm', {
            params: {
                type: 'devices',
                used: true
            }
        })
            .then(response => {
                dispatch(receiveDevices(domoticzAdapter(response.data.result)));
            })
    }
};