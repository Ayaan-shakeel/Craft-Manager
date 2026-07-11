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
 export const updateOrder=async(id:string | number,data:{
    product_name:string,
    quantity:number,
    price:number,
    status:string,
    // customer_id:number

 })=>{
    try{
        const response=await api.put(`/api/orders/${id}`,data);
           return response.data
    }catch(error){
        console.error("Error while creating order",error)
        
    }
}

export const getOrderById=async(id:string | number)=>{
    try{
        const response=await api.get(`/api/orders/${id}`)
        return response.data.order
    }catch(error){
        console.error("Error fetching orders:",error)
        throw error
    }
 }