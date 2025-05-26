import axios from "axios";

//------------- (tickets) קריאות לשרת----------

let baseUrl="https://node-server-034d.onrender.com/api/products";

export const apiGetAllTickets=(page)=>{
    return axios.get(baseUrl+"?limit=6&page="+page);
}
export const apiAddTickets=(card,token)=>{
    return axios.post(baseUrl,card,{headers:{xxx:token}});
}
export const apiGetTicketById=(id)=>{
    return axios.get(baseUrl+"/"+id);
}
export const apiDeleteTicketById=(id,token)=>{
    return axios.delete(baseUrl+"/"+id,{headers:{xxx:token}});
}
export const apiUpdateTicketById=(id,data,token)=>{
    return axios.put(baseUrl+"/"+id,data,{headers:{xxx:token}});
}