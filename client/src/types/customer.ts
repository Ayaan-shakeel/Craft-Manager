export interface Customer{
    id:number,
    customer_name:string,
    customer_email:string,
    phone:string,
    address:string,
    notes:string
  }

export interface CustomerFormData{
      customer_name:string,
      customer_email:string,
      phone:string,
      address:string,
      notes:string
  }

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