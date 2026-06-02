# Rehaish – Smart Renting Ecosystem (Frontend)

Frontend for **Rehaish**, a smart renting ecosystem that supports the rental lifecycle: verified listings, visit scheduling, QR-based visit check-in/out, rental intent, agreement & initial payment, key handover, and ongoing rent/bills history.

---

## Tech Stack

- **React** (Vite or CRA)
- **React Router**
- **Bootstrap 5** (primary UI)  
  _Optional:_ Tailwind can be used if required
- **Axios** with JWT auth, token refresh, and domain API modules
- **State Management:** React Context (or Redux Toolkit if you switch later)

---

## Features (Phase 1 – UI)

### Roles (RBAC UI)
- Tenant
- Landlord
- Platform Agent
- Admin

### Tenant
- Browse/search **verified listings**
- Listing details + shortlist/favorites
- Request property visits (contact hidden)
- Visit status tracking (Requested → Scheduled → Completed)
- QR token screen + QR scan simulation (token input)
- Submit rental intent + intent status
- Agreement preview/download
- Initial payment flow (deposit + rent + charges)
- Rent & bills payment history

### Landlord
- Create property listing (multi-step form)
- Upload photos + proof documents (UI only)
- Listing status tracking (Draft/Pending/Verified/Rejected)
- Review verification feedback
- Manage visit requests (approve/decline)
- Review rental intents (accept/reject)
- Key handover confirmation

### Platform Agent
- Assigned property verifications
- Verification checklist + photo upload + decision
- Visit scheduling + escort UI
- Generate QR token
- Support check-in/out simulation

### Admin
- Dashboard summary cards
- Listing moderation (override approve/reject)
- Monitoring & audit logs UI (table + filters)

## API Setup

Create `.env` from `.env.example` and point it at the Django backend:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

The frontend uses `src/services/api/client.js` for a shared Axios instance,
JWT access-token injection, refresh-token retry on `401`, and normalized API
errors. Domain API files live in `src/services/api/`.

---

## Figma Design

Figma link:  
https://www.figma.com/make/Q0x4chPvJeJ5YiorNNjL7s/Rehaish-Application-Screens?t=x51kdjMmfFMcgEmA-1

> If you don’t have access to the Figma file, the UI is built from the documented flows and can be adjusted once designs are available.

---

## Project Structure (Recommended)

```bash
src/
  assets/
  components/
    common/
      Navbar.jsx
      Sidebar.jsx
      StatusBadge.jsx
      Stepper.jsx
      Modal.jsx
    forms/
      TextInput.jsx
      SelectInput.jsx
      FileUpload.jsx
  layouts/
    AuthLayout.jsx
    TenantLayout.jsx
    LandlordLayout.jsx
    AgentLayout.jsx
    AdminLayout.jsx
  pages/
    auth/
      Login.jsx
      Register.jsx
    tenant/
      Listings.jsx
      ListingDetail.jsx
      Shortlist.jsx
      Visits.jsx
      VisitQR.jsx
      RentalIntent.jsx
      AgreementPayment.jsx
      RentBills.jsx
    landlord/
      CreateListing.jsx
      MyListings.jsx
      VerificationFeedback.jsx
      VisitRequests.jsx
      Intents.jsx
      KeyHandover.jsx
    agent/
      AssignedVerifications.jsx
      VerificationForm.jsx
      VisitScheduling.jsx
      QrSupport.jsx
    admin/
      Dashboard.jsx
      Moderation.jsx
      AuditLogs.jsx
  routes/
    AppRoutes.jsx
    ProtectedRoute.jsx
  services/
    api/
      client.js
      tokenStorage.js
      mappers.js
      auth.js
      listings.js
      visits.js
      intents.js
      payments.js
      landlord.js
      agent.js
      admin.js
  context/
    AuthContext.jsx
    AppContext.jsx
  utils/
    constants.js
    helpers.js
  App.jsx
  main.jsx
