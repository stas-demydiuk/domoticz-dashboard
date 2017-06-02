const pageWidgets = (state = [], action) => {
    switch (action.type) {
    case 'ADD_WIDGET':
        return [...state, action.payload.widget];
    case 'REMOVE_WIDGET':
        return state.filter((element, index) => index !== action.payload.widget);
    case 'UPDATE_LAYOUT':
        return state.map((element, index) => {
            const { x, y, w, h } = action.payload.layout[index];
            return { ...element, layout: { x, y, w, h } };
        });
    default:
        return state;
    }
};

const pages = (state = [], action) => {
    switch (action.type) {
    case 'ADD_PAGE':
        return [...state, action.payload];
    case 'ADD_WIDGET':
    case 'REMOVE_WIDGET':
    case 'UPDATE_LAYOUT':
        return state.map((page, idx) => {
            return idx === action.payload.page
                ? { ...page, widgets: pageWidgets(page.widgets, action) }
                : page;
        });
    default:
        return state;
    }
};

export default pages;
