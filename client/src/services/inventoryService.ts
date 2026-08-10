import api from "@/lib/api";
export const getInventory=async()=>{
    try{
        const response=await api.get("/api/inventory")
        return response.data
    }catch(error){
        console.error("Inventory Fetching Failed",error)
        throw error
    }
}
export const createInventory=async(data:{
    product_name:string
    quantity:number
    cost_price:number
    selling_price:number
    sku:string
    category:string,
    stock_status:string
})=>{ 
    try{
        const response=await api.post("/api/inventory",data)
        return response.data
    }catch(error){
        console.error("Error while creating create Inventory")
        throw error
    }
}

export const getSingleInventory=async(id:string | number)=>{
    try{
        const response=await api.get(`/api/inventory/${id}`)
        return response.data
    }catch(error){
        console.error("Error while fetching single inventory",error)
        throw error
    }
}
export const updateInventory=async(id:string | number,
    data:{
    product_name:string
    quantity:number
    cost_price:number
    selling_price:number
    sku:string
    category:string,
    }
)=>{
    try{
        const response=await api.put("/api/inventory",data)
        return response.data
    }catch(error){
        console.error("Error while updating order ",error)
        throw error
    }
    
}