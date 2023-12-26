import axios from "axios"; 

// export const API_URL = "http://127.0.0.1:8000/"; 
export const API_URL = "https://prashkumar.pythonanywhere.com/"; 


export const AxiosInstance = axios.create({
    baseURL : "https://prashkumar.pythonanywhere.com/",
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