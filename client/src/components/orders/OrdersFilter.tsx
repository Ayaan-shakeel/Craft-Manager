'use client'
import React from 'react'
interface OrdersFilterProps {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  status: string,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  sort: string,
  setSort: React.Dispatch<React.SetStateAction<string>>,
  setPage: React.Dispatch<React.SetStateAction<number>>
}
export default function OrdersFilter({ search, setSearch, status, setStatus, sort, setSort, setPage }: OrdersFilterProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Filter your orders
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Search orders, filter by status, and sort them the way you want.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-sm font-semibold text-slate-700">
            Search
          </label>
          <input
            type="search"
            id="search"
            value={search}
            onChange={(e) =>{
               setSearch(e.target.value);
               setPage(1);
}}
          placeholder="Search by product or customer"
          className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-semibold text-slate-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) =>{
              setStatus(e.target.value);
               setPage(1);
              }}
            className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
          <label htmlFor="sort" className="text-sm font-semibold text-slate-700">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) =>{ 
              setSort(e.target.value);
               setPage(1);
              }}
            className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price_highest">Highest Total Price</option>
            <option value="price_lowest">Lowest Total Price</option>
          </select>
        </div>
      </div>
    </div>
  )
}
