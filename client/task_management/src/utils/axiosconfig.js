import axios from "axios"; 

export const API_URL = "http://127.0.0.1:8000/"; 


export const AxiosInstance = axios.create({
    baseURL : "http://127.0.0.1:8000/",
   // withCredentials : true,
    Headers:{
        'content-type':'application/json',
    }
})

export const addAuthToken = (token) => {
    if (token) {
        AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete AxiosInstance.defaults.headers.common['Authorization'];
    }
};