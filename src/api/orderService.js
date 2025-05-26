import axios from "axios";

//------------- (orders) קריאות לשרת----------

let baseUrl="https://node-server-034d.onrender.com/api/orders"
export const apiAddOrder = (order,token) => {
    return axios.post(baseUrl,order,{headers:{xxx:token}});
}
export const apiGetAllOredrs = (token) => {
    return axios.get(baseUrl,{headers:{xxx:token}});
}
export const apiUpdateOrderSentById = (id,token) => {
    return axios.put(baseUrl+"/"+id,{},{headers:{xxx:token}});
}