import api from "@/lib/api";

export const getCustomers=async()=>{
    try{
        const response=await api.get("/api/customers")
        return response.data.customers
    }catch(error){
        console.error("Error fetching customers:",error)
        throw error
    }
 }

 export const createCustomer=async(data:{
    customer_name:string,
    customer_email:string,
    address:string,
    phone:string,
    notes:string
 })=>{
    try{

        const response=await api.post("/api/customers",data);
        return response.data.customer
    }catch(error){
        console.error("Error while creating customer",error)
        
    }
 }

 export const deleteCustomer=async(id:string|number)=>{
    try{
        const response=await api.delete(`/api/customers/${id}`);
        return response.data

    }catch(error){
        console.log("Error while deleting customer",error)
        throw error
    }
 }
 export const updateCustomer=async(id:string|number,data:{
    customer_name:string,
    customer_email:string,
    address:string,
    phone:string,
    notes:string
 })=>{
    try{

        const response=await api.put(`/api/customers/${id}`,data);
        return response.data.customer
    }catch(error){
        console.error("Error while updating customer",error)
        
    }
 }
