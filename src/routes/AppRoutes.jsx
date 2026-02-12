import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import TenantLayout from "../layouts/TenantLayout.jsx";
import LandlordLayout from "../layouts/LandlordLayout.jsx";
import AgentLayout from "../layouts/AgentLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Home from "../pages/common/Home/index.jsx";
import Unauthorized from "../pages/common/Unauthorized/index.jsx";
import NotFound from "../pages/common/NotFound/index.jsx";

import Login from "../pages/auth/Login/index.jsx";
import Register from "../pages/auth/Register/index.jsx";
import Profile from "../pages/auth/Profile/index.jsx";

import TenantListings from "../pages/tenant/Listings/index.jsx";
import TenantListingDetail from "../pages/tenant/ListingDetail/index.jsx";
import TenantShortlist from "../pages/tenant/Shortlist/index.jsx";
import TenantVisits from "../pages/tenant/Visits/index.jsx";
import TenantVisitQR from "../pages/tenant/VisitQR/index.jsx";
import TenantRentalIntent from "../pages/tenant/RentalIntent/index.jsx";
import TenantRentAndBills from "../pages/tenant/RentAndBills/index.jsx";
import TenantServices from "../pages/tenant/Services/index.jsx";
import TenantFlatmates from "../pages/tenant/Flatmates/index.jsx";
import TenantPaymentHistory from "../pages/tenant/PaymentHistory/index.jsx";
import TenantRentHistory from "../pages/tenant/RentHistory/index.jsx";
import TenantPropertyHistory from "../pages/tenant/PropertyHistory/index.jsx";
import TenantRequestVisit from "../pages/tenant/RequestVisit/index.jsx";
import TenantSubmitIntent from "../pages/tenant/SubmitRentalIntent/index.jsx";
import TenantAgreementPreview from "../pages/tenant/AgreementPreview/index.jsx";
import TenantInitialPayment from "../pages/tenant/InitialPayment/index.jsx";
import TenantKeyHandover from "../pages/tenant/KeyHandover/index.jsx";
import TenantServiceBooking from "../pages/tenant/ServiceBooking/index.jsx";
import TenantServiceOrders from "../pages/tenant/ServiceOrders/index.jsx";
import TenantFlatmateProfile from "../pages/tenant/FlatmateProfile/index.jsx";
import TenantFlatmateMatches from "../pages/tenant/FlatmateMatches/index.jsx";
import TenantMessages from "../pages/tenant/Messages/index.jsx";

import LandlordDashboard from "../pages/landlord/Dashboard/index.jsx";
import LandlordCreateListing from "../pages/landlord/CreateListing/index.jsx";
import LandlordListings from "../pages/landlord/MyListings/index.jsx";
import LandlordVerification from "../pages/landlord/VerificationFeedback/index.jsx";
import LandlordVisitRequests from "../pages/landlord/VisitRequests/index.jsx";
import LandlordIntents from "../pages/landlord/Intents/index.jsx";
import LandlordKeyHandover from "../pages/landlord/KeyHandover/index.jsx";

import AgentDashboard from "../pages/agent/Dashboard/index.jsx";
import AgentAssigned from "../pages/agent/AssignedVerifications/index.jsx";
import AgentVerificationForm from "../pages/agent/VerificationForm/index.jsx";
import AgentVisitScheduling from "../pages/agent/VisitScheduling/index.jsx";
import AgentQrSupport from "../pages/agent/QrSupport/index.jsx";

import AdminDashboard from "../pages/admin/Dashboard/index.jsx";
import AdminModeration from "../pages/admin/Moderation/index.jsx";
import AdminAudit from "../pages/admin/AuditLogs/index.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/tenant" element={<ProtectedRoute allow={["tenant"]} />}>
        <Route element={<TenantLayout />}>
          <Route index element={<TenantListings />} />
          <Route path="listings" element={<TenantListings />} />
          <Route path="listing/:id" element={<TenantListingDetail />} />
          <Route path="shortlist" element={<TenantShortlist />} />
          <Route path="visits" element={<TenantVisits />} />
          <Route path="qr" element={<TenantVisitQR />} />
          <Route path="intent" element={<TenantRentalIntent />} />
          <Route path="agreement" element={<TenantAgreementPreview />} />
          <Route path="agreement-preview/:id" element={<TenantAgreementPreview />} />
          <Route path="initial-payment/:id" element={<TenantInitialPayment />} />
          <Route path="key-handover/:id" element={<TenantKeyHandover />} />
          <Route path="rent-bills" element={<TenantRentAndBills />} />
          <Route path="rent-history" element={<TenantRentHistory />} />
          <Route path="payment-history" element={<TenantPaymentHistory />} />
          <Route path="property-history" element={<TenantPropertyHistory />} />
          <Route path="services" element={<TenantServices />} />
          <Route path="service/:id" element={<TenantServiceBooking />} />
          <Route path="service-orders" element={<TenantServiceOrders />} />
          <Route path="flatmates" element={<TenantFlatmates />} />
          <Route path="flatmate-profile" element={<TenantFlatmateProfile />} />
          <Route path="flatmate-matches" element={<TenantFlatmateMatches />} />
          <Route path="messages" element={<TenantMessages />} />
          <Route path="payments" element={<TenantPaymentHistory />} />
          <Route path="request-visit/:id" element={<TenantRequestVisit />} />
          <Route path="submit-intent/:id" element={<TenantSubmitIntent />} />
        </Route>
      </Route>

      <Route path="/landlord" element={<ProtectedRoute allow={["landlord"]} />}>
        <Route element={<LandlordLayout />}>
          <Route index element={<LandlordDashboard />} />
          <Route path="dashboard" element={<LandlordDashboard />} />
          <Route path="create" element={<LandlordCreateListing />} />
          <Route path="listings" element={<LandlordListings />} />
          <Route path="verification" element={<LandlordVerification />} />
          <Route path="visits" element={<LandlordVisitRequests />} />
          <Route path="intents" element={<LandlordIntents />} />
          <Route path="key-handover" element={<LandlordKeyHandover />} />
        </Route>
      </Route>

      <Route path="/agent" element={<ProtectedRoute allow={["agent"]} />}>
        <Route element={<AgentLayout />}>
          <Route index element={<AgentDashboard />} />
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="verifications" element={<AgentAssigned />} />
          <Route path="verification-form" element={<AgentVerificationForm />} />
          <Route path="visits" element={<AgentVisitScheduling />} />
          <Route path="qr-support" element={<AgentQrSupport />} />
        </Route>
      </Route>

      <Route path="/admin" element={<ProtectedRoute allow={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="moderation" element={<AdminModeration />} />
          <Route path="audit" element={<AdminAudit />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
