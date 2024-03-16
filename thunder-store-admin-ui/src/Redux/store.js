import { authSlide, productSlide, loadingSlide, orderSlide, categoriesSlide } from './Slide';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userSlide from './Slide/UserSlide';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','category'],
    blacklist: ['product'],
};

