const domoticzDeviceDataAdapter = (devices) => devices.map(device => {
    return {
        id: device.idx,
        label: device.Name,
        value: getDeviceValue(device),
        isActive: isDeviceActive(device),
        raw: device
    }
});

function isDeviceActive(device) {
    return ['On', 'Unlocked'].indexOf(device.Data) !== -1
}

function getDeviceValue(device) {
    if (device.Type === 'Temp + Humidity') {
        return {
            temperature: device.Temp,
            celsius: device.Data.indexOf(' C') > 0,
            humidity: device.Humidity
        }
    }

    if (device.Data.indexOf('Set Level') !== -1) {
        return device.Level;
    }

    return device.Data;
}

export default domoticzDeviceDataAdapter;