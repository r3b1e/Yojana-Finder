import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import dashboardReducer from './dashSlice';

const appStore = configureStore({
    reducer: {
        language:languageReducer,
        dashData: dashboardReducer,

    }
});

export default appStore;