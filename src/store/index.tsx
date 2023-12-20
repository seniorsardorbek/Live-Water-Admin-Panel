import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import dataConfigSlice from './dataConfigSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    data  : dataConfigSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
