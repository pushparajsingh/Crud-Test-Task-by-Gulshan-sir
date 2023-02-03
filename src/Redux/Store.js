import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './Slice/RootReducer'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)