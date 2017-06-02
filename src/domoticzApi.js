import axios from 'axios';
import { roomAdapter, deviceAdapter } from './domoticzAdapter';

const url = 'http://192.168.1.15:8090/json.htm';

export function loadDevices() {
    return axios
        .get(url, {
            params: {
                type: 'devices',
                used: true,
            },
        })
        .then((response) => {
            const devices = response.data.result || [];
            return devices.map(deviceAdapter);
        });
}

export function loadRooms() {
    return axios
        .get(url, {
            params: {
                type: 'plans',
                used: true,
            },
        })
        .then((response) => {
            if (response.data.status !== 'OK') {
                throw new Error(response.data.status);
            }

            return response.data.result.map(roomAdapter);
        });
}

export const setDeviceSate = (id, value) => axios
    .get(url, {
        params: {
            type: 'command',
            param: 'switchlight',
            idx: id,
            switchcmd: value,
        },
    });

export const setDeviceLevel = (id, value) => axios
    .get(url, {
        params: {
            type: 'command',
            param: 'switchlight',
            idx: id,
            switchcmd: 'Set Level',
            level: value,
        },
    });

export const setDeviceColor = (id, color) => axios
    .get(url, {
        params: {
            type: 'command',
            param: 'setcolbrightnessvalue',
            idx: id,
            hue: color.hsv.h,
            brightness: parseInt(color.hsv.v * 100, 10),
            iswhite: color.rgb.r === 255 && color.rgb.g === 255 && color.rgb.b === 255,
        },
    });
