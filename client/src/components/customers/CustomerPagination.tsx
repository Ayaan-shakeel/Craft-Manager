"use client";

interface CustomerPaginationProps {
  page: number;
  totalPages: number;
  totalCustomers: number;
  limit: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export default function CustomerPagination({
  page,
  totalPages,
  totalCustomers,
  limit,
  loading,
  onPageChange,
}: CustomerPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);

  const startItem =
    totalCustomers === 0 ? 0 : (page - 1) * limit + 1;

  const endItem = Math.min(page * limit, totalCustomers);

  // Display a small range of page numbers
  const getPageNumbers = () => {
    const pages: number[] = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(safeTotalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalCustomers === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
      {/* Results information */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalCustomers}
        </span>{" "}
        customers
      </p>

      {/* Pagination controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous button */}
        <button
          type="button"
          disabled={page <= 1 || loading}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Previous
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            disabled={loading}
            onClick={() => onPageChange(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`h-10 min-w-10 rounded-lg border px-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
              pageNumber === page
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next button */}
        <button
          type="button"
          disabled={page >= safeTotalPages || loading}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}