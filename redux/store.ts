import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSlice from './features/useSlice'
import { setupListeners } from '@reduxjs/toolkit/query'


import {
    // persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

// adding our persist configs
const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

// adding our rootReducer
const rootReducer = combineReducers({
    user: useSlice,
    // [diseaseApi.reducerPath]: diseaseApi.reducer,
});

// persisting our rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating our store and exporting it
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }
        ).concat(),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)