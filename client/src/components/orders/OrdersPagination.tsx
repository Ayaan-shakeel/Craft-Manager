'use client'
import React from 'react'
interface OrdersPaginationProps{
        page:number,
        setPage:React.Dispatch<React.SetStateAction<number>>,
        totalPages:number
    }
export default function OrdersPagination({page,setPage,totalPages}:OrdersPaginationProps) {
    
  return (  
    <div>
        <button onClick={()=>page>1 && setPage(page-1)}
                disabled={page===1}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2"
                 >Prev</button>
        <span>{page} of {totalPages}</span>
        <button onClick={()=>page<totalPages && setPage(page+1)}
        disabled={page===totalPages}
              className="rounded-2xl border border-slate-200 bg-
              white px-4 py-2">Next</button>
    </div>
  ) 
}
