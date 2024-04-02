// 创建reducer文件，例如 reducers/chatReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { addGroupChatMessage, addSingleChatMessage } from '../actions/chatActions';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        onlineList: [],
    },
    reducers: {
        [addGroupChatMessage]: (state, action) => {
            state.messages.push(action.payload);
        },
        [addSingleChatMessage]: (state, action) => {
            state.messages.push(action.payload);
        },
        updateOnlineList: (state, action) => {
            state.onlineList = action.payload;
        },
    },
});

export const { updateOnlineList } = chatSlice.actions;
