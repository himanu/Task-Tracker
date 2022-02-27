import { configureStore } from '@reduxjs/toolkit';
import Auth from './Slices/Auth';
import Tasks from './Slices/Tasks';

const store = configureStore({
    reducer: {
        auth: Auth,
        tasks: Tasks
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    }
})

export default store;