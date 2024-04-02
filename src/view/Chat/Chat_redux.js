// // 在Chat组件中使用connect函数包装，并提取redux状态和dispatch方法
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import io from 'socket.io-client';
// import { addGroupChatMessage, addSingleChatMessage } from '../actions/chatActions';
// // ... 其他导入不变 ...

// const Chat = () => {
//     const dispatch = useDispatch();
//     const messages = useSelector(state => state.chat.messages);
//     const onlineList = useSelector(state => state.chat.onlineList);
//     const [message, setMessage] = useState('');
//     const [selector, setSelector] = useState('all');
//     const navigate = useNavigate();
//     const listRef = useRef(null);

//     useEffect(() => {
//         const newSocket = io(`ws://localhost:4000?token=${localStorage.getItem("token")}`);

//         newSocket.on(WebSocketType.GroupChat, (msg) => {
//             const title = msg.user ? msg.user.username : "广播";
//             dispatch(addGroupChatMessage(title, msg.data));
//             scrollToBottom();
//             setMessage("");
//         });

//         // ... 其他socket监听事件，将setMessages替换为dispatch相应的action ...

//         return () => {
//             newSocket.disconnect();
//         };
//     }, [dispatch]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (selector === 'all') {
//             dispatch(addGroupChatMessage('Broadcast', message));
//         } else {
//             dispatch(addSingleChatMessage(selector, message));
//         }
//         setMessage('');
//     };

//     // ... 其他不变 ...

//     return (
//     // ... JSX部分不变 ...
//   );
// };

// export default connect()(Chat); // 如果使用的是@reduxjs/toolkit，无需mapStateToProps/mapDispatchToProps

// // ... 其他文件不变 ...