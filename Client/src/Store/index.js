import { configureStore } from '@reduxjs/toolkit';
import Auth from './Slices/Auth';
import Tasks from './Slices/Tasks';
import Projects from './Slices/Projects';

const store = configureStore({
    /**
     * A single reducer function that will be used as the root reducer, or an
     * object of slice reducers that will be passed to `combineReducers()`.
    */
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


// docx
// the reducer: is an 