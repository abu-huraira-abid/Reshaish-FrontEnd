import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import StatsGrid from "./components/StatsGrid.jsx";
import CategoryList from "./components/CategoryList.jsx";
import ServiceSearchBar from "./components/ServiceSearchBar.jsx";
import ServiceCard from "./components/ServiceCard.jsx";
import DataPagination from "../../../components/common/DataPagination.jsx";
import { fetchServiceCategories, fetchServices } from "../../../services/api/marketplace.js";

export default function Services() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceCategories().then(setCategories);
    fetchServices().then(setServices);
  }, []);

  const filtered = useMemo(() => {
    let data = [...services];
    if (activeCategory !== "all") {
      data = data.filter((service) => service.category === activeCategory);
    }
    if (query.trim()) {
      const value = query.toLowerCase();
      data = data.filter(
        (service) =>
          service.title.toLowerCase().includes(value) ||
          service.vendor.toLowerCase().includes(value)
      );
    }
    return data;
  }, [services, activeCategory, query]);
  const pagedServices = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">Services Marketplace</div>
        <div className="section-subtitle">Book trusted home services for your rental</div>
      </div>
      <StatsGrid />
      <div className="row g-3">
        <div className="col-lg-3">
          <div className="sticky-top" style={{ top: "72px" }}>
            <CategoryList items={categories} active={activeCategory} onSelect={handleCategorySelect} />
          </div>
        </div>
        <div className="col-lg-9">
          <ServiceSearchBar query={query} onQueryChange={handleQueryChange} />
          <div className="row g-3">
            {pagedServices.map((service) => (
              <div className="col-md-6" key={service.id}>
                <ServiceCard service={service} onClick={() => navigate(`/tenant/service/${service.id}`)} />
              </div>
            ))}
          </div>
          {filtered.length > 0 && (
            <DataPagination
              itemLabel="services"
              page={page}
              pageSize={pageSize}
              pageSizeOptions={[6, 12, 24, 48]}
              totalItems={filtered.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
          <div className="card service-orders d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex flex-column flex-grow-1 text-start">
              <div className="fw-semibold">Track Your Service Orders</div>
              <div className="text-muted small">View booking status and history</div>
            </div>
            <button
              className="btn btn-primary-soft"
              onClick={() => navigate("/tenant/service-orders")}
            >
              My Orders
              <ChevronRight size={16} className="ms-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
