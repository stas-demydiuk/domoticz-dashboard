import mqtt from 'mqtt';

import { updateDevice } from './actions/index';

const DOMOTICZ_TOPIC_IN = 'domoticz/in';
const DOMOTICZ_TOPIC_OUT = 'domoticz/out';

export default function init(store) {
    const client = mqtt.connect('ws://192.168.1.15:9001');

    client.on('connect', () => {
        client.subscribe(DOMOTICZ_TOPIC_OUT);
    });

    client.on('message', (topic, message) => {
        const data = JSON.parse(message.toString());
        console.log(topic, data);

        // Ignore RGB/W switches as response doesn't contain color
        if (data.stype.indexOf('RGB') !== -1) {
            return;
        }

        store.dispatch(updateDevice(
            data.idx.toString(),
            data.name,
            getDeviceValue(data),
            getDeviceActiveStatus(data),
        ));
    });
}

function getDeviceValue(device) {
    if (device.switchType === 'On/Off') {
        return device.nvalue > 0
            ? 'On'
            : 'Off';
    }

    if (device.switchType === 'Dimmer') {
        return parseInt(device.svalue1, 10);
    }

    return device.nvalue;
}

function getDeviceActiveStatus(device) {
    return device.nvalue > 0;
}
