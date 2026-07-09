import api from "@/lib/api";
export const LoginUser=async (data:{
    email:string,
    password:string
})=>{
    const response=await api.post('/users/login',data);
    return response.data
}
export const RegisterUser=async(data:{
    name:string,
    email:string,
    password:string
})=>{
    const response=await api.post('/users/register',data);
    return response.data
}

