'use client'

export default function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex justify-between">
            <div className="space-y-3">
              <div className="h-4 w-44 rounded bg-slate-200"></div>
              <div className="h-3 w-32 rounded bg-slate-200"></div>
            </div>

            <div className="h-7 w-24 rounded-full bg-slate-200"></div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="h-4 rounded bg-slate-200"></div>
            <div className="h-4 rounded bg-slate-200"></div>
          </div>
        </div>
      ))}
    </div>
  )
}