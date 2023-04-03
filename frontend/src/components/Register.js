import React from 'react'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { register } from '../API/api'

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
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
        register(data).then((res) => {
            console.log(res)
            navigate('/home')
            localStorage.setItem('email', data.email)
        })
        .catch((err) => {
            console.log(err)
            alert(err.response.data)
        })
    }

    return (
    <>
    <h3>Register</h3>
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" onChange={handleChagne} name="name" id="name" required />
        <br/>
        <br/>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={handleChagne} name="email" id="email" required />
        <br/>
        <br/>
        <label htmlFor="password">Password</label>
        <input type="-password" onChange={handleChagne} name="password" id="password" required />
        <br/>
        <br/>
        <button type="submit">Register</button>
    </form>
    <p>Already have an account <NavLink to="/">Login</NavLink></p>   
    </>
  )
}

export default Register