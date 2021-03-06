export const deviceAdapter = device => ({
    id: device.idx,
    label: device.Name,
    value: getDeviceValue(device),
    isActive: isDeviceActive(device),
    raw: device,
});

export const roomAdapter = room => ({
    id: room.idx,
    name: room.Name,
    order: parseInt(room.Order, 10),
});

function isDeviceActive(device) {
    if (['On', 'Unlocked'].indexOf(device.Data) !== -1) {
        return true;
    }

    if (['Off', 'Locked'].indexOf(device.Data) !== -1) {
        return false;
    }

    return device.Level > 0;
}

function getDeviceValue(device) {
    if (device.Type === 'Temp + Humidity') {
        return {
            temperature: device.Temp,
            celsius: device.Data.indexOf(' C') > 0,
            humidity: device.Humidity,
        };
    }

    if (device.Type === 'Light/Switch' && device.SwitchType === 'Dimmer') {
        return device.Level;
    }

    if (device.SubType === 'kWh') {
        return device.Usage;
    }

    return device.Data;
}
