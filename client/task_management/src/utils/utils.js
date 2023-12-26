import { AxiosInstance } from "./axiosconfig";

export const setToken = (userToken) =>{
    localStorage.setItem("token",userToken);
}


export const getToken = () =>{
    const token = localStorage.getItem("token");
    if (token !== null){
        return token;
    }
    return null;
}


export const deletToken = ()=>{
    localStorage.removeItem('toekn')
}





