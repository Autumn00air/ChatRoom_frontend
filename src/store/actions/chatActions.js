// 创建actions文件，例如 actions/chatActions.js
import { createAction } from '@reduxjs/toolkit';

export const addGroupChatMessage = createAction('ADD_GROUP_CHAT_MESSAGE', (title, data) => ({
    payload: { title, data },
}));

export const addSingleChatMessage = createAction('ADD_SINGLE_CHAT_MESSAGE', (title, data) => ({
    payload: { title, data },
}));