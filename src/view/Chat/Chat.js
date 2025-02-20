import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom"
import styles from "./chat.module.css"

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
        const newSocket = io(`ws://localhost:4000?token=${localStorage.getItem("token")}`);
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
            scrollToBottom();
            setMessage("")
        })
        newSocket.on(WebSocketType.SingleChat, (msg) => {
            var title = msg.user ? msg.user.username : "广播"
            console.log(title + " : " + msg.data)
            setMessages(prevMessages => [...prevMessages, { title: title, data: msg.data, single: true }]);
            scrollToBottom();
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
        setMessage("")
        // // 向服务器发送消息
        // if (message && socket) {
        //     socket.emit('chat message', message);
        //     setMessage('');
        // }
    };
    const listRef = useRef(null);
    function createMessage(data, to) {
        return {
            data,
            to
        }
    }
    const scrollToBottom = () => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    return (
        <div className={styles.main}>
            <h2>实时聊天</h2>

            <ul className={styles.return} ref={listRef}>
                {messages.map((msg, index) => (
                    msg.single ?
                        <li key={index}>&gt; {msg.title} 给你偷偷发了  :  {msg.data}</li> :
                        <li key={index}>&gt; {msg.title}  :  {msg.data}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className={styles.message}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="You want to say...?"
                />
                <select value={selector} onChange={(e) => SetSelector(e.target.value)}>
                    <option value="all">all</option>
                    {onlineList.map(item =>
                        <option key={item.username} value={item.username}>{item.username}</option>
                    )}
                </select>
                <button type="submit" className={styles.button}>send!</button>
            </form>
        </div>
    );
};

export default Chat;