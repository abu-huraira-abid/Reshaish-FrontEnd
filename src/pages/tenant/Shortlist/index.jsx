import React, { useEffect, useState } from "react";
import DataPagination from "../../../components/common/DataPagination.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import ShortlistCard from "./components/ShortlistCard.jsx";
import { fetchListings } from "../../../services/api/listings.js";
import { useApp } from "../../../context/AppContext.jsx";

export default function Shortlist() {
  const { favorites, toggleFavorite } = useApp();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    fetchListings()
      .then((listings) =>
        setItems(listings.filter((listing) => favorites.includes(listing.id)))
      )
      .catch(() => setItems([]));
  }, [favorites]);

  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Shortlisted Homes</div>
        <div className="section-subtitle">Save listings to compare them later.</div>
      </div>
      {items.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Save listings while browsing to see them here."
        />
      ) : (
        <>
          <div className="row g-4">
            {pagedItems.map((listing) => (
              <div className="col-md-6 col-xl-4" key={listing.id}>
                <ShortlistCard listing={listing} onRemove={toggleFavorite} />
              </div>
            ))}
          </div>
          <DataPagination
            itemLabel="homes"
            page={page}
            pageSize={pageSize}
            pageSizeOptions={[6, 12, 24, 48]}
            totalItems={items.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  );
}
