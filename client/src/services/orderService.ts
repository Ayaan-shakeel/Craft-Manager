import api from "@/lib/api";
export const getOrders=async()=>{
    try{
        const response=await api.get("/api/orders")
        return response.data
    }catch(error){
        console.error("Error fetching orders:",error)
        throw error
    }
 }
 export const createOrder=async(data:{
    product_name:string,
    quantity:number,
    price:number,
    customer_id:number

 })=>{
    try{
        const response=await api.post("/api/orders",data);
           return response.data
    }catch(error){
        console.error("Error while creating order",error)
        
    }
}