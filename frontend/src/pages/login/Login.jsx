import React, { useContext, useState } from "react";
import axios from "axios"
import "./login.scss"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../hooks/AuthContext"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        const res = await axios.post("axios/login", credentials)
        if (res.data.isAdmin) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate("/")
        }
        else {
            dispatch({ type: "LOGIN_FAILURE", payload: { message: "Unauthorized!" } })
        }
        try {

        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.res.data })
        }
    }
    console.log(user)

    return (
        <div className="login">
            <div className="container">
                <h1>Login</h1>
                <input type="text" placeholder="Username" id="username" onChange={handleChange} />
                <input type="password" placeholder="Password" id="password" onChange={handleChange} />
                <button onClick={handleLogin} className="">
                Login    
                </button> 

                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login