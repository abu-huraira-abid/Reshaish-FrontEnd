// Basic frontend model shapes (JS) for reference.

export const UserModel = {
  id: "u-1",
  name: "",
  role: "tenant",
  email: ""
};

export const PropertyModel = {
  id: "p-1",
  address: "",
  city: "",
  type: "Apartment"
};

export const ListingStatus = {
  Draft: "Draft",
  PendingVerification: "PendingVerification",
  Verified: "Verified",
  Rejected: "Rejected",
  Unavailable: "Unavailable"
};

export const VerificationReportModel = {
  id: "r-1",
  listingId: "l-1",
  decision: "Verified",
  summary: "",
  notes: ""
};

export const VisitRequestModel = {
  id: "v-1",
  listingId: "l-1",
  status: "Requested",
  requestedSlots: []
};

export const VisitQRTokenModel = {
  visitId: "v-1",
  token: "QR-v-1"
};

export const VisitCheckInModel = {
  visitId: "v-1",
  checkInAt: "",
  checkOutAt: ""
};

export const RentalIntentModel = {
  id: "i-1",
  listingId: "l-1",
  status: "pending",
  message: ""
};

export const AgreementModel = {
  id: "a-1",
  status: "PendingAcceptance",
  signedAt: ""
};

export const PaymentTransactionModel = {
  id: "p-1",
  amount: 0,
  status: "Success",
  date: ""
};

export const CommissionLedgerModel = {
  id: "c-1",
  agreementId: "a-1",
  fee: 0
};

export const KeyHandoverModel = {
  id: "k-1",
  method: "OTP",
  timestamp: ""
};

export const ServiceOrderModel = {
  id: "s-1",
  category: "Cleaning",
  status: "Scheduled"
};

export const FlatmateProfileModel = {
  id: "f-1",
  name: "",
  budget: 0
};
