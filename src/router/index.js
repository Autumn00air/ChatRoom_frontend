import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../view/Home'
import Login from '../view/Login/Login'
import Chat from '../view/Chat'
import Notfound from '../view/Notfound'
export default function Myrouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home></Home>}>
                    <Route path='chat' element={<Chat></Chat>}></Route>
                </Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path="*" element={<Notfound></Notfound>} />
            </Routes>
        </BrowserRouter>
    )
}
