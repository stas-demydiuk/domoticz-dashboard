import axios from 'axios';
import { roomAdapter, deviceAdapter } from './domoticzAdapter';

let url = '/json.htm';

export function setDomoticzConfig(config) {
    url = `${config.protocol}://`;

    if (config.username && config.password) {
        url += `${config.username}:${config.password}@`;
    }

    url += `${config.server}/json.htm`;
}

export async function loadDevices() {
    const response = await axios.get(url, {
        params: {
            type: 'devices',
            used: true,
        },
    });

    const devices = response.data.result || [];
    return devices.map(deviceAdapter);
}

export async function loadRooms() {
    const response = await axios.get(url, {
        params: {
            type: 'plans',
            used: true,
        },
    });

    if (response.data.status !== 'OK') {
        throw new Error(response.data.status);
    }

    return response.data.result.map(roomAdapter);
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
            hex: color.hex.replace('#', '').toUpperCase(),
            brightness: 100,
            iswhite: color.rgb.r === 255 && color.rgb.g === 255 && color.rgb.b === 255,
        },
    });
