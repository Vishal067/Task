import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8001/auth',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const register = (payload) => api.post(`/register`, payload)

export const login = (payload) => api.post(`/login`, payload)

export const insertTime = (payload) => api.post(`/time`, payload)

// export const insertUser = payload => api.post(`/user`, payload)
// export const getAllUsers = () => api.get(`/users`)
