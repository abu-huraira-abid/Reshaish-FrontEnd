import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./components/PropertyCard.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import Loading from "../../../components/common/Loading.jsx";
import { fetchMyListings } from "../../../services/api/landlord.js";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    fetchMyListings().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const currentListings = listings.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="section-title">My Properties</div>
          <div className="section-subtitle">Track and manage your property listings.</div>
        </div>
        <Link className="btn btn-primary-soft" to="/landlord/create">
          Add Property
        </Link>
      </div>

      {loading ? (
        <Loading label="Loading listings" />
      ) : (
        <>
          <div className="row g-3">
            {currentListings.map((listing) => (
              <div className="col-12 col-md-4 col-lg-4" key={listing.id}>
                <PropertyCard listing={listing} />
              </div>
            ))}
          </div>
          {listings.length > 0 && (
            <DataPagination
              itemLabel="properties"
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[6, 12, 24, 48]}
              totalItems={listings.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </>
      )}
    </div>
  );
}
