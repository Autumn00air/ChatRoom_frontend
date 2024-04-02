import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import styles from "./Sign.module.css"

axios.interceptors.response.use(function (response) {
    // console.log("请求成功后 ，第一个调用的方法")
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export default function Login() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate()

    //#todo 可以在这里加个防抖请求，直接在输入框下写一段用户名已存在
    function handleLogin(e) {
        e.preventDefault()
        console.log(username, password)
        axios.post("/api/user", {
            username: username,
            password: password,
        }).then(res => {
            console.log(res.data)
            if (res.data.ok === 1) {
                localStorage.setItem("username", username)
                //存储token
                navigate("/login")
            } else {
                setusername("")
                alert("用户名已存在")
            }
        })
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleLogin} autoComplete="off" className={styles.form}>
                <h2>Sign up</h2>
                <label><input type='text' value={username} onInput={(e) => {
                    setusername(e.target.value)
                }} placeholder='用户名'></input></label>
                <label><input type='password' value={password} onInput={(e) => {
                    setpassword(e.target.value)
                }} autoComplete='new-password' placeholder='密码'></input></label>
                <div onClick={() => {
                    navigate("/login")
                }}
                    className={styles.sign}
                >Login in</div>
                <label><button type='submit'>注册</button></label>
            </form>
        </div>
    )
}
