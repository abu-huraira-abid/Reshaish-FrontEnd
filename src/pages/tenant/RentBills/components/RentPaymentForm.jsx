import React, { useState } from "react";
import TextInput from "../../../../components/forms/TextInput.jsx";
import SelectInput from "../../../../components/forms/SelectInput.jsx";

export default function RentPaymentForm({ onPay }) {
  const [type, setType] = useState("Rent");
  const [amount, setAmount] = useState("75000");

  const handleSubmit = (event) => {
    event.preventDefault();
    onPay({ type, amount: Number(amount) });
  };

  return (
    <form className="card p-3" onSubmit={handleSubmit}>
      <h6 className="mb-2">Pay rent or bill</h6>
      <SelectInput
        label="Payment type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={[
          { value: "Rent", label: "Rent" },
          { value: "Electricity", label: "Electricity" },
          { value: "Water", label: "Water" },
          { value: "Gas", label: "Gas" }
        ]}
      />
      <TextInput
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn btn-primary-soft" type="submit">
        Pay now
      </button>
    </form>
  );
}
