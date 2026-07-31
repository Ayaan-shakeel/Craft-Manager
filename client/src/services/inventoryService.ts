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
    category:string
})=>{ 
    try{
        const response=await api.post("/api/inventory")
        return response.data
    }catch(error){
        console.error("Error while creating create Inventory")
        throw error
    }
}