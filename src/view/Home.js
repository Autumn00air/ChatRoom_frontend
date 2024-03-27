// import React, { useEffect,useState } from 'react'
// import { Outlet ,useNavigate} from "react-router-dom"
// import io from "socket.io"

// const WebSocketType = {
//     Error: 0, //错误
//     GroupList: 1,
//     GroupChat: 2,
//     SingleChat: 3
// }
// export default function Home() {
//     const navigate = useNavigate()
//     const [onlineList, setonlineList] = useState([]);
//     //引入socket.io js端
//     useEffect(() => {
//         const socket = io(`ws://localhost:3000?token=${localStorage.getItem("token")}`); //默认 连接了localhost

//     socket.on(WebSocketType.GroupChat, (msg) => {
//         var title = msg.user ? msg.user.username : "广播"
//         console.log(title + " : " + msg.data)
//     })
//     socket.on(WebSocketType.SingleChat, (msg) => {
//         var title = msg.user ? msg.user.username : "广播"
//         console.log(title + " : " + msg.data)
//     })

//     socket.on(WebSocketType.Error, (msg) => {
//         localStorage.removeItem("token")
//         navigate("/chat")
//     })

//     socket.on(WebSocketType.GroupList, (msgObj) => {
//         // console.log(msg)
//          setonlineList(msgObj.data)

//     })


//         return () => {
//             console.log("退出")
//         };
//     }, []);

//     function createMessage(data, to) {
//         return {
//             data,
//             to
//         }
//     }
//     function handlemessage(){

//             if (myselect === "all") {
//                 // console.log("群发")
//                 socket.emit(WebSocketType.GroupChat, createMessage(message))
//             } else {
//                 // console.log("siliao")
//                 socket.emit(WebSocketType.SingleChat, createMessage(message, myselect))
//             }
//     }
// const [message, setmessage] = useState("");
// const [myselect, setmyselect] = useState("");
//     return (
//         <div>
//             <p>Home</p>
//             <h1>当前用户:
//         <b id="user"></b>
//     </h1>
//     <input type="text" value={message} onInput={(e)=>{setmessage(e.target.value)}}/><button id="send" onClick={handlemessage}>send</button>

//     <select id="select" value={myselect} onInput={(e)=>{setmyselect(e.target.value)}}> 
//     <option value="all">all</option>
//     {onlineList.map(item => `
//                 <option value="${item.username}">${item.username}</option>
//             `).join("")}
//     </select>


//             <Outlet></Outlet>
//         </div>
//     )
// }
import React, { useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import Chat from './Chat'
export default function Home() {
    const [open, setopen] = useState(false);
    const username = localStorage.getItem("username")
    return (
        <div>
            <h1>Home</h1>
            <h2>this is {username}</h2>
            <button onClick={() => {
                setopen(true)
            }}>连接聊天室？</button>
            {open && <Chat></Chat>}
        </div>
    )
}
