import { widgetTypes } from '../dashboard';

export default {
    widgetTypes: {
        [widgetTypes.binaryState]: 'Бинарное состояние',
        [widgetTypes.climate]: 'Температура + влажность',
        [widgetTypes.clock]: 'Часы',
        [widgetTypes.color]: 'RGB/RGBW контроллер',
        [widgetTypes.counter]: 'Счетчик',
        [widgetTypes.dimmer]: 'Диммер',
        [widgetTypes.switch]: 'Выключатель',
    },
};
