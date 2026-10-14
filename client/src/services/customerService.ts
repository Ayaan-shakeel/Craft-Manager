import api from "@/lib/api";
import {Customer} from "@/types/customer";
export interface CustomerQuery {
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: "id" | "customer_name" | "customer_email";
  sort_order?: "asc" | "desc";
}

export interface CustomersResponse {
  message: string;
  count: number;
  page: number;
  limit: number;
  total_pages: number;
  customers: Customer[];
}
export const getCustomers=async(
    params:CustomerQuery = {}

):Promise<CustomersResponse>=>{
    try{
        const response=await api.get("/api/customers", {params})
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
