import axios from 'axios';

const BASE_URL = '/dashboard';

export const ADD_WIDGET = 'ADD_WIDGET';
export const addWidget = (page, layout, widgetType, widgetStyle, deviceId) => async (dispatch) => {
    await axios.post(`${BASE_URL}/pages/${page}/widgets`, {
        deviceId,
        layout,
        type: widgetType,
        style: widgetStyle,
    });

    dispatch({
        type: ADD_WIDGET,
        payload: {
            page,
            widget: {
                layout,
                deviceId,
                type: widgetType,
                style: widgetStyle,
            },
        },
    });
};

export const UPDATE_WIDGET = 'UPDATE_WIDGET';
export const updateWidget = (page, widgetIndex, widgetType, widgetStyle, deviceId) => async (dispatch) => {
    await axios.patch(`${BASE_URL}/pages/${page}/widgets/${widgetIndex}`, {
        type: widgetType,
        style: widgetStyle,
        deviceId,
    });

    dispatch({
        type: UPDATE_WIDGET,
        payload: {
            page,
            widgetIndex,
            widgetType,
            widgetStyle,
            deviceId,
        },
    });
};

export const REMOVE_WIDGET = 'REMOVE_WIDGET';
export const removeWidget = (page, widgetIndex) => async (dispatch) => {
    await axios.delete(`${BASE_URL}/pages/${page}/widgets/${widgetIndex}`);

    dispatch({
        type: REMOVE_WIDGET,
        payload: {
            page,
            widgetIndex,
        },
    });
};

export const ADD_PAGE = 'ADD_PAGE';
export const addPage = (roomId, widgets) => ({
    type: ADD_PAGE,
    payload: {
        roomId,
        widgets,
    },
});

export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const saveLayout = (page, type, layout) => async (dispatch) => {
    const body = layout.map(({ w, h, x, y }) => ({ w, h, x, y }));

    axios.put(`${BASE_URL}/pages/${page}/layout/${type}`, body);

    dispatch({
        type: UPDATE_LAYOUT,
        payload: {
            page,
            type,
            layout,
        },
    });
};
