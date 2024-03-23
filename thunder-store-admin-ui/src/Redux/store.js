import { authSlide, productSlide, loadingSlide, orderSlide, categoriesSlide } from './Slide';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userSlide from './Slide/UserSlide';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'category'],
    blacklist: ['product'],
};

const rootReducer = combineReducers({
    auth: authSlide.reducer,
    product: productSlide.reducer,
    order: orderSlide.reducer,
    loading: loadingSlide.reducer,
    category: categoriesSlide.reducer,
    users: userSlide.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
export default store;
