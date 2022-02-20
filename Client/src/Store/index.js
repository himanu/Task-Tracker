import { configureStore } from '@reduxjs/toolkit';
import Auth from './Slices/Auth';
import Tasks from './Slices/Tasks';
const middleware1 = (storeApi) => (next) => (action) => {
    console.log('middleware1 ', storeApi);
    next(action);
    return 'middleware1';
}
const middleware2 = (storeApi) => (next) => (action) => {
    console.log('middleware2');
    next(action);
    return 'middleware2';
}
const store = configureStore({
    reducer: {
        auth: Auth,
        tasks: Tasks
    },
    middleware: (getDefaultMiddleware) => {
        return [middleware1, middleware2].concat(getDefaultMiddleware());
    }
})

export default store;