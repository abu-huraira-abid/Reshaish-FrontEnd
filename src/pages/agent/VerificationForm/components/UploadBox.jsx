import React, { useEffect, useMemo } from "react";
import { ImagePlus, X } from "lucide-react";

export default function UploadBox({ file, onChange }) {
  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="card p-3">
      <div className="fw-semibold mb-3">Upload Verification Photos</div>
      <label className={`verification-upload-box ${file ? "uploaded" : ""}`}>
        {previewUrl ? (
          <img src={previewUrl} alt="Verification preview" />
        ) : (
          <>
            <ImagePlus size={30} />
            <span className="fw-semibold">Click to upload verification photo</span>
            <small>Upload a clear property photo from your visit</small>
          </>
        )}
        <input
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(event) => onChange(event.target.files?.[0] || null)}
          type="file"
        />
      </label>
      {file && (
        <button
          className="btn btn-light border verification-upload-remove"
          onClick={() => onChange(null)}
          type="button"
        >
          <X size={15} />
          Remove photo
        </button>
      )}
    </div>
  );
}
