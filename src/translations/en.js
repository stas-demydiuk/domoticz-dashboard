import { widgetTypes } from '../dashboard';

export default {
    widgetTypes: {
        [widgetTypes.binaryState]: 'Binary State',
        [widgetTypes.climate]: 'Climate Sensor',
        [widgetTypes.clock]: 'Clock',
        [widgetTypes.color]: 'RGB/RGBW controller',
        [widgetTypes.counter]: 'Counter',
        [widgetTypes.dimmer]: 'Dimmer',
        [widgetTypes.switch]: 'Switch',
    },
};
