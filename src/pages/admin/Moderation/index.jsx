import React, { useEffect, useState } from "react";
import ModerationRow from "./components/ModerationRow.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import { fetchModerationListings } from "../../../services/api/admin.js";

export default function Moderation() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchModerationListings().then(setListings);
  }, []);

  const pagedListings = listings.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Listing Moderation</div>
        <div className="section-subtitle">Monitor listing verification status and agent review progress.</div>
      </div>
      <div className="d-grid gap-3">
        {pagedListings.map((listing) => (
          <ModerationRow key={listing.id} listing={listing} />
        ))}
      </div>
      {listings.length > 0 && (
        <DataPagination
          itemLabel="listings"
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          totalItems={listings.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
