import { Users } from "lucide-react";

export default function EmptyCustomerState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Users size={28} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">
        No customers yet
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        There are no customer records available right now. Add your first customer to see them here.
      </p>
    </div>
  );
};