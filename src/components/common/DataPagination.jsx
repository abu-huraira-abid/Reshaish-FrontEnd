import React, { useEffect, useMemo } from "react";

const DEFAULT_PAGE_SIZES = [5, 10, 20, 50];

function buildPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push("start-ellipsis");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push("end-ellipsis");
  pages.push(totalPages);

  return pages;
}

export default function DataPagination({
  itemLabel = "items",
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  totalItems
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endItem = Math.min(safePage * pageSize, totalItems);

  useEffect(() => {
    if (page !== safePage) {
      onPageChange(safePage);
    }
  }, [onPageChange, page, safePage]);

  const pageNumbers = useMemo(
    () => buildPageNumbers(safePage, totalPages),
    [safePage, totalPages]
  );

  return (
    <div className="data-pagination">
      <div className="data-pagination-summary">
        Showing {startItem}-{endItem} of {totalItems} {itemLabel}
      </div>

      <div className="data-pagination-controls">
        <label className="data-page-size">
          <span>Rows per page</span>
          <select
            className="form-select form-select-sm"
            value={pageSize}
            onChange={(event) => {
              onPageSizeChange(Number(event.target.value));
              onPageChange(1);
            }}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <nav aria-label={`${itemLabel} pagination`}>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                disabled={safePage === 1}
                onClick={() => onPageChange(safePage - 1)}
                type="button"
              >
                Previous
              </button>
            </li>

            {pageNumbers.map((pageNumber) =>
              typeof pageNumber === "number" ? (
                <li
                  className={`page-item ${pageNumber === safePage ? "active" : ""}`}
                  key={pageNumber}
                >
                  <button
                    className="page-link"
                    onClick={() => onPageChange(pageNumber)}
                    type="button"
                  >
                    {pageNumber}
                  </button>
                </li>
              ) : (
                <li className="page-item disabled" key={pageNumber}>
                  <span className="page-link">...</span>
                </li>
              )
            )}

            <li className={`page-item ${safePage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                disabled={safePage === totalPages}
                onClick={() => onPageChange(safePage + 1)}
                type="button"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
