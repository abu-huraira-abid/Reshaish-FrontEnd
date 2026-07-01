import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  QrCode,
  ScanLine,
  Square,
  VideoOff
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { scanVerificationQr } from "../../../services/api/agent.js";

export default function QrSupport() {
  const [searchParams] = useSearchParams();
  const initialToken = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraMessage, setCameraMessage] = useState("");
  const [confirmed, setConfirmed] = useState(null);
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const scanningRef = useRef(false);

  const stopCamera = () => {
    scanningRef.current = false;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraActive(false);
  };

  useEffect(() => stopCamera, []);

  const detectLoop = async () => {
    const Detector = globalThis.BarcodeDetector;
    if (!Detector || !videoRef.current) {
      setCameraMessage(
        "Camera is open. If your browser does not auto-detect QR codes, scan with your phone camera and paste the token here."
      );
      return;
    }

    const detector = new Detector({ formats: ["qr_code"] });
    scanningRef.current = true;
    setCameraMessage("Point the camera at the visit QR code.");

    while (scanningRef.current && videoRef.current) {
      try {
        const codes = await detector.detect(videoRef.current);
        const rawValue = codes?.[0]?.rawValue;
        if (rawValue) {
          let parsedToken = rawValue;
          if (rawValue.includes("token=")) {
            try {
              parsedToken = new URL(rawValue).searchParams.get("token") || rawValue;
            } catch {
              parsedToken = rawValue.split("token=").pop() || rawValue;
            }
          }
          setToken(parsedToken || rawValue);
          setCameraMessage("QR code captured. Confirm the visit now.");
          stopCamera();
          break;
        }
      } catch {
        setCameraMessage("Camera is open. Keep the QR code inside the frame.");
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      streamRef.current = stream;
      setCameraActive(true);
      setCameraMessage("Starting camera...");
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      detectLoop();
    } catch (error) {
      toast.error("Camera permission was denied or camera is not available.");
      setCameraMessage(error.message || "Unable to open camera.");
    }
  };

  const handleScan = async (event) => {
    event.preventDefault();
    if (!token.trim()) {
      toast.error("Enter or scan the visit QR token.");
      return;
    }

    setLoading(true);
    try {
      const result = await scanVerificationQr(token.trim());
      setConfirmed(result);
      toast.success(result.detail || "Visit confirmed.");
    } catch (error) {
      toast.error(error.message || "Unable to confirm visit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="section-title">QR Scanner</div>
        <div className="section-subtitle">
          Scan or enter visit QR codes to confirm tenant meetings and verification visits.
        </div>
      </div>

      <div className="qr-scanner-layout">
        <section className="card qr-camera-card">
          <div className="qr-camera-frame">
            {cameraActive ? (
              <video ref={videoRef} className="qr-camera-video" muted playsInline />
            ) : (
              <div className="qr-camera-empty">
                <QrCode size={52} />
                <span>Camera preview</span>
              </div>
            )}
            <div className="qr-scan-corners" />
          </div>

          <div className="qr-camera-actions">
            <button
              className="btn btn-primary-soft"
              disabled={cameraActive}
              onClick={openCamera}
              type="button"
            >
              <Camera size={17} />
              Open camera
            </button>
            <button
              className="btn btn-light border"
              disabled={!cameraActive}
              onClick={stopCamera}
              type="button"
            >
              <VideoOff size={17} />
              Stop camera
            </button>
          </div>

          <div className="qr-camera-message">
            <Square size={14} />
            {cameraMessage || "Open the camera and place the QR code inside the frame."}
          </div>
        </section>

        <form className="card qr-confirm-card" onSubmit={handleScan}>
          <div className="qr-confirm-icon">
            <QrCode size={34} />
          </div>
          <div>
            <h2>Confirm visit</h2>
            <p>
              Scan the QR code with the app camera or paste the token from the
              QR result.
            </p>
          </div>

          <div className="input-group">
            <span className="input-group-text">
              <ScanLine size={18} />
            </span>
            <input
              className="form-control"
              onChange={(event) => setToken(event.target.value)}
              placeholder="Paste QR token"
              value={token}
            />
          </div>

          <button className="btn btn-primary-soft" disabled={loading} type="submit">
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" />
                Confirming...
              </>
            ) : (
              <>
                <CheckCircle2 size={17} />
                Confirm visit
              </>
            )}
          </button>

          {confirmed && (
            <div className="qr-confirm-success">
              Visit #{confirmed.visit} confirmed for property #{confirmed.property}.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
