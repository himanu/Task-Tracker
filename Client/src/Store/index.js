import { configureStore } from '@reduxjs/toolkit';
import Auth from './Slices/Auth';

const store = configureStore({
    reducer: {
        auth: Auth
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    }
})

export default store;