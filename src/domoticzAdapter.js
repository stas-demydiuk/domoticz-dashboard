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

    if (device.Type === 'Light/Switch' && device.SwitchType === 'Dimmer') {
        return device.Level;
    }

    if (device.SubType === 'kWh') {
        return device.Usage;
    }

    return device.Data;
}

export default domoticzDeviceDataAdapter;