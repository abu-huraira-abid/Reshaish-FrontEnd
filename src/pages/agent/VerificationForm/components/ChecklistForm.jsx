import React, { useState } from "react";
import TextArea from "../../../../components/forms/TextArea.jsx";
import SelectInput from "../../../../components/forms/SelectInput.jsx";
import FileUpload from "../../../../components/forms/FileUpload.jsx";
import Checkbox from "../../../../components/forms/Checkbox.jsx";

export default function ChecklistForm({ onSubmit }) {
  const [decision, setDecision] = useState("Verified");
  const [notes, setNotes] = useState("");
  const [checks, setChecks] = useState({
    ownership: true,
    utilities: true,
    photos: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ decision, notes, checks });
  };

  return (
    <form className="card p-3" onSubmit={handleSubmit}>
      <h6 className="mb-2">Verification checklist</h6>
      <Checkbox
        label="Ownership documents verified"
        checked={checks.ownership}
        onChange={(e) => setChecks((prev) => ({ ...prev, ownership: e.target.checked }))}
      />
      <Checkbox
        label="Utilities working"
        checked={checks.utilities}
        onChange={(e) => setChecks((prev) => ({ ...prev, utilities: e.target.checked }))}
      />
      <Checkbox
        label="Photos captured"
        checked={checks.photos}
        onChange={(e) => setChecks((prev) => ({ ...prev, photos: e.target.checked }))}
      />
      <FileUpload label="Upload photos" multiple />
      <SelectInput
        label="Decision"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
        options={[
          { value: "Verified", label: "Verified" },
          { value: "Rejected", label: "Rejected" },
          { value: "Need More Evidence", label: "Need More Evidence" }
        ]}
      />
      <TextArea
        label="Notes"
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add observations for landlord."
      />
      <button className="btn btn-primary-soft" type="submit">
        Submit report
      </button>
    </form>
  );
}
