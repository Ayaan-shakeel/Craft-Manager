import React from 'react'

export default function DashboardCard({children}:{children:React.ReactNode}) {
  return (
    <div className="flex flex-col text-gray-800 bg-linear-to-br from-gray-200 to-slate-300  rounded-lg shadow-md p-6 w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
      {children}
    </div>
  )
}
