// 在store中注册reducer
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chatReducer';

const store = configureStore({
    reducer: {
        chat: chatReducer,
        // 其他reducers...
    },
});

export default store;