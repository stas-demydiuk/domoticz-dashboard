export const widgetTypes = {
    clock: 'CLOCK',
    climate: 'CLIMATE',
    color: 'COLOR',
    counter: 'COUNTER',
    dimmer: 'DIMMER',
    'switch': 'SWITCH',
    binaryState: 'BINARY-STATE',
};

export const deviceType = {
    'switch': 'switch',
    'presence': 'presence',
    'motion': 'motion',
    'other': 'other'
};

export const config = [
    {
        layout: {x: 0, y: 0, w: 1, h: 1, static: true},
        type: widgetTypes.clock,
        style: 'primary'
    },
    {
        layout: {x: 1, y: 0, w: 2, h: 1, minW: 1, maxW: 4},
        deviceId: '9',
        type: widgetTypes.climate,
        style: 'primary'
    },
    {
        layout: {x: 3, y: 0, w: 1, h: 1, static: true},
        type: widgetTypes.switch,
        deviceId: '10'
    },
    {
        layout: {x: 0, y: 1, w: 1, h: 1, static: true},
        type: widgetTypes.switch,
        deviceId: '25'
    },
    {
        layout: {x: 1, y: 1, w: 1, h: 1, static: true},
        type: widgetTypes.binaryState,
        deviceId: '11',
        icons: {
            On: 'fa-heartbeat',
            Off: 'fa-heart-o'
        }
    },
    {
        layout: {x: 2, y: 1, w: 1, h: 1, static: true},
        type: widgetTypes.binaryState,
        deviceId: '4',
        icons: {
            On: 'fa-heartbeat',
            Off: 'fa-heart-o'
        }
    },
    {
        layout: {x: 3, y: 1, w: 1, h: 1, static: true},
        type: widgetTypes.switch,
        deviceId: '25'
    },
    {
        layout: {x: 0, y: 2, w: 1, h: 1, static: true},
        type: widgetTypes.binaryState,
        deviceId: '1',
        icons: {
            On: 'fa-eye',
            Off: 'fa-eye-slash'
        }
    },
    {
        layout: {x: 1, y: 2, w: 1, h: 1, static: true},
        type: widgetTypes.binaryState,
        deviceId: '2',
        icons: {
            On: 'fa-eye',
            Off: 'fa-eye-slash'
        }
    },
    {
        layout: {x: 2, y: 2, w: 1, h: 1, static: true},
        type: widgetTypes.binaryState,
        deviceId: '5',
        icons: {
            On: 'fa-unlock',
            Off: 'fa-lock'
        }
    },
    {
        layout: {x: 3, y: 2, w: 1, h: 1, static: true},
        type: widgetTypes.dimmer,
        deviceId: '15'
    },
    {
        layout: {x: 0, y: 3, w: 1, h: 1, static: true},
        type: widgetTypes.color,
        deviceId: '12'
    },
    {
        layout: {x: 1, y: 3, w: 1, h: 1, static: true},
        type: widgetTypes.color,
        deviceId: '41'
    },
    {
        layout: {x: 2, y: 3, w: 1, h: 1, static: true},
        type: widgetTypes.color,
        deviceId: '44'
    },
    {
        layout: {x: 3, y: 3, w: 1, h: 1, static: true},
        type: widgetTypes.color,
        deviceId: '14'
    },
    {
        layout: {x: 0, y: 4, w: 1, h: 1, static: true},
        type: widgetTypes.counter,
        deviceId: '39'
    },
];