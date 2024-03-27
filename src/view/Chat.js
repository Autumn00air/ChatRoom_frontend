import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom"

const WebSocketType = {
    Error: 0, //错误
    GroupList: 1,
    GroupChat: 2,
    SingleChat: 3
}
const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [onlineList, setOnlineList] = useState([])
    const [selector, SetSelector] = useState("all")
    const navigate = useNavigate()
    useEffect(() => {
        // 连接到服务器
        const newSocket = io(`ws://localhost:4000?token=${localStorage.getItem("token")}`); // 替换为你的服务器地址和端口
        setSocket(newSocket);

        // 监听新消息事件
        // newSocket.on('chat message', (msg) => {
        //     setMessages([...messages, msg]);
        // });



        newSocket.on(WebSocketType.GroupChat, (msg) => {
            var title = msg.user ? msg.user.username : "广播"
            console.log(title + " : " + msg.data)

            console.log('%c [  ]-34', 'font-size:13px; background:pink; color:#bf2c9f;', msg)

            console.log('%c [  ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', messages)
            //#todo 这种写法有问题，可能在并发上
            // setMessages([...messages, { title: title, data: msg.data }]);
            setMessages(prevMessages => [...prevMessages, { title: title, data: msg.data }]);
            setMessage("")
        })
        newSocket.on(WebSocketType.SingleChat, (msg) => {
            var title = msg.user ? msg.user.username : "广播"
            console.log(title + " : " + msg.data)
            setMessages(prevMessages => [...prevMessages, { title: title, data: msg.data }]);
            setMessage("")
        })

        newSocket.on(WebSocketType.Error, (msg) => {
            console.log(msg)
            localStorage.removeItem("token")
            navigate("/login")
        })

        newSocket.on(WebSocketType.GroupList, (msgObj) => {
            const onlineList = msgObj.data
            setOnlineList(onlineList)
        })


        // 清理函数，断开连接
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('%c [  ]-61', 'font-size:13px; background:pink; color:#bf2c9f;', selector)
        if (selector === "all") {
            // console.log("群发")
            console.log(message)
            socket.emit(WebSocketType.GroupChat, createMessage(message))
        } else {
            // console.log("siliao")
            socket.emit(WebSocketType.SingleChat, createMessage(message, selector))
        }

        // // 向服务器发送消息
        // if (message && socket) {
        //     socket.emit('chat message', message);
        //     setMessage('');
        // }
    };
    function createMessage(data, to) {
        return {
            data,
            to
        }
    }

    return (
        <div>
            <h2>实时聊天</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="请输入消息..."
                />
                <button type="submit">发送</button>
            </form>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.title}:{msg.data}</li>
                ))}
            </ul>
            <select value={selector} onChange={(e) => SetSelector(e.target.value)}>
                <option value="all">all</option>
                {onlineList.map(item =>
                    <option key={item.username} value={item.username}>{item.username}</option>
                )}
            </select>
        </div>
    );
};

export default Chat;