import axios from "axios";

//------------- (users) קריאות לשרת----------

let baseUrl="https://node-server-034d.onrender.com/api/user";

export const apiGetAllUsers=(user)=>{
    return axios.get(baseUrl);
}
export const loginUser = (username,password) => {
    return axios.post(`${baseUrl}/login`, {username,password})
}
export const apiAddUser=(user)=>{
    return axios.post(baseUrl,user);
}
export const apiGetUserById=(userId)=>{
    return axios.get(`${baseUrl}/${userId}`);
}