import { configureStore } from '@reduxjs/toolkit';
import userAuth from './userAuthReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userAuth.reducer)

const store = configureStore({
    reducer: {
        userAuth: persistedReducer
    },
    middleware: []
})

export const persistor = persistStore(store)

export default store;
