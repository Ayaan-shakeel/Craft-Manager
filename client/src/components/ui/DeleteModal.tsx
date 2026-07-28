'use client'

import React from 'react'
import {Trash2} from "lucide-react"
interface DeleteModalProps{
    isOpen:boolean
    title:string
    message:string
    onClose:()=>void
    onConfirm:()=>void
}

export default function DeleteModal({
    isOpen,
    title,
    message,
    onClose,
    onConfirm
}:DeleteModalProps){

    if(!isOpen) return null

    return(

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

<div className="w-[90%] max-w-md rounded-3xl bg-white p-8 shadow-2xl">

<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">

<span className="text-3xl"><Trash2/></span>

</div>

<h2 className="mt-5 text-center text-2xl font-bold text-slate-800">
{title}
</h2>

<p className="mt-3 text-center text-slate-500">
{message}
</p>

<div className="mt-8 flex gap-3">

<button
onClick={onClose}
className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold hover:bg-slate-100 transition"
>
Cancel
</button>

<button
onClick={onConfirm}
className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
>
Delete
</button>

</div>

</div>

</div>

    )

}