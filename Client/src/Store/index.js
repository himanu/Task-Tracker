import { configureStore } from '@reduxjs/toolkit';
import Auth from './Slices/Auth';
import Tasks from './Slices/Tasks';
import Projects from './Slices/Projects';

const store = configureStore({
    reducer: {
        auth: Auth,
        tasks: Tasks,
        projects: Projects
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    }
})

export default store;