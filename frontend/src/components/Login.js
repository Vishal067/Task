import React from 'react'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { login } from '../API/api'

const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChagne = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        // call api and then navigate to home page
        login(data).then((res) => {
            console.log(res)
            navigate('/home')
            localStorage.setItem('email', data.email)
        })
        .catch((err) => {
            console.log(err.response)
            alert(err.response.data)
        })       
    }
  return (
    <>
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={handleChagne} name="email" id="email" required/>
        <br/>
        <br/>
        <label htmlFor="password">Password</label>
        <input type="-password" onChange={handleChagne} name="password" id="password" required/>
        <br/>
        <br/>
        <button type="submit">Login</button>
    </form>
    <p>Not a member? <NavLink to="/register">Register</NavLink></p>
    </>
  )
}

export default Login