import { ADD_WIDGET, UPDATE_WIDGET, REMOVE_WIDGET, ADD_PAGE, UPDATE_LAYOUT } from '../../actions/index';

const pageWidgets = (state = [], action) => {
    switch (action.type) {
    case ADD_WIDGET:
        return [...state, action.payload.widget];
    case UPDATE_WIDGET:
        return state.map((element, index) => {
            if (index !== action.payload.widgetIndex) {
                return element;
            }

            return {
                ...element,
                deviceId: action.payload.deviceId,
                type: action.payload.widgetType,
                style: action.payload.widgetStyle,
            };
        });
    case REMOVE_WIDGET:
        return state.filter((element, index) => index !== action.payload.widgetIndex);
    case UPDATE_LAYOUT:
        return state.map((element, index) => {
            const { x, y, w, h } = action.payload.layout[index];
            return {
                ...element,
                layout: {
                    ...element.layout,
                    [action.payload.type]: { x, y, w, h },
                },
            };
        });
    default:
        return state;
    }
};

const pages = (state = [], action) => {
    switch (action.type) {
    case ADD_PAGE:
        return [...state, action.payload];
    case ADD_WIDGET:
    case UPDATE_WIDGET:
    case REMOVE_WIDGET:
    case UPDATE_LAYOUT:
        return state.map((page, idx) => (
            idx === action.payload.page
                ? { ...page, widgets: pageWidgets(page.widgets, action) }
                : page
        ));
    default:
        return state;
    }
};

export default pages;
