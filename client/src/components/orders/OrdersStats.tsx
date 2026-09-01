'use client'

import {
    ShoppingBag,
    Clock3,
    CheckCircle2,
    Truck,
    IndianRupee
} from "lucide-react"
import { OrderStats } from "@/types/order"

interface OrdersStatsProps{
    stats:OrderStats
}

export default function OrdersStats({stats}:OrdersStatsProps){

    const cards=[
        {
            title:"Total Orders",
            value:stats.total_orders,
            icon:<ShoppingBag size={22}/>,
            bg:"bg-blue-50",
            color:"text-blue-600"
        },
        {
            title:"Pending",
            value:stats.pending,
            icon:<Clock3 size={22}/>,
            bg:"bg-yellow-50",
            color:"text-yellow-600"
        },
        {
            title:"Completed",
            value:stats.completed,
            icon:<CheckCircle2 size={22}/>,
            bg:"bg-green-50",
            color:"text-green-600"
        },
        {
            title:"Shipped",
            value:stats.shipped,
            icon:<Truck size={22}/>,
            bg:"bg-purple-50",
            color:"text-purple-600"
        },
        {
            title:"Revenue",
            value:`₹ ${stats.revenue.toLocaleString("en-IN")}`,
            icon:<IndianRupee size={22}/>,
            bg:"bg-emerald-50",
            color:"text-emerald-600"
        }
    ]

    return(
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 mb-8">
            {
                cards.map((card,index)=>(
                    <div
                        key={index}
                        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    {card.title}
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                                    {card.value}
                                </h2>
                            </div>

                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${card.bg} ${card.color}`}>
                                {card.icon}
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}