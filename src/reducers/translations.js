import translations from '../translations';

const reducer = (state = translations.ru, action) => {
    switch (action.type) {
    case 'SET_LANGUAGE':
        return translations[action.payload];
    default:
        return state;
    }
};

export default reducer;
