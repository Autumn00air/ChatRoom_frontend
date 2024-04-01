import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../view/Home/Home'
import Login from '../view/Login/Login'
import Chat from '../view/Chat/Chat'
import Notfound from '../view/Notfound'
export default function Myrouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthComponent>{LazyLoad("Home/Home")}</AuthComponent>}>
                    <Route path='chat' element={LazyLoad("Chat")}></Route>
                </Route>
                <Route path='/login' element={LazyLoad("Login/Login")}></Route>
                <Route path="*" element={<Notfound></Notfound>} />
            </Routes>
        </BrowserRouter>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path='/' element={<AuthComponent><Home></Home></AuthComponent>}>
        //             <Route path='chat' element={<Chat></Chat>}></Route>
        //         </Route>
        //         <Route path='/login' element={<Login></Login>}></Route>
        //         <Route path="*" element={<Notfound></Notfound>} />
        //     </Routes>
        // </BrowserRouter>
    )
}

function AuthComponent({ children }) {
    const isLogin = localStorage.getItem("token")
    return isLogin ? children : <Navigate to="/login"></Navigate>
}

const LazyLoad = (path) => {
    const Comp = React.lazy(() => import(`../view/${path}`))
    return (
        <React.Suspense fallback={<>加载中...</>}>
            <Comp />
        </React.Suspense>
    )
}