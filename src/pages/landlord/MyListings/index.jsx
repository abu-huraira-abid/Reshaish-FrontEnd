import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./components/PropertyCard.jsx";
import Loading from "../../../components/common/Loading.jsx";
import { fetchMyListings } from "../../../services/mock/landlord.js";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMyListings().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.max(1, Math.ceil(listings.length / itemsPerPage));
  const currentListings = listings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const goToPage = (nextPage) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="section-title">My Properties</div>
          <div className="section-subtitle">Track and manage your verified listings.</div>
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
              <div className="col-12 col-md-4 col-lg-4" key={listing.id}>                <PropertyCard listing={listing} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <nav className="mt-4 d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(page - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <li
                      className={`page-item ${pageNumber === page ? "active" : ""}`}
                      key={pageNumber}
                    >
                      <button className="page-link" onClick={() => goToPage(pageNumber)}>
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => goToPage(page + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
