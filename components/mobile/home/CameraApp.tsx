"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "photo" | "video";
type FacingMode = "user" | "environment";

export default function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startingRef = useRef(false);

  const [facingMode, setFacingMode] = useState<FacingMode>("user");
  const [mode, setMode] = useState<Mode>("photo");
  const [error, setError] = useState<string | null>(null);

  /* ---------------- helpers ---------------- */

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  /* ---------------- camera start ---------------- */

  async function startCamera() {
    if (startingRef.current) return; // ✅ prevent double start
    startingRef.current = true;

    try {
      stopCamera();

      let stream: MediaStream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      // wait for metadata safely
      await new Promise<void>((res) => {
        video.onloadedmetadata = () => res();
      });

      // 👇 IMPORTANT: ignore AbortError
      try {
        await video.play();
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          throw err;
        }
      }

      setError(null);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera unavailable");
    } finally {
      startingRef.current = false;
    }
  }

  /* ---------------- lifecycle ---------------- */

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  /* ---------------- actions ---------------- */

  function switchCamera() {
    setFacingMode((p) => (p === "user" ? "environment" : "user"));
  }

  function capturePhoto() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);
    const photo = canvas.toDataURL("image/png");

    console.log("📸 Photo captured", photo);
  }

  /* ---------------- UI ---------------- */

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: facingMode === "user" ? "scaleX(-1)" : "none",
        }}
      />

      {/* top mode switch */}
      <div className="absolute top-6 w-full flex justify-center gap-10 text-white text-sm z-10">
        <button
          onClick={() => setMode("photo")}
          className={mode === "photo" ? "font-bold" : "opacity-60"}
        >
          PHOTO
        </button>
        <button
          onClick={() => setMode("video")}
          className={mode === "video" ? "font-bold" : "opacity-60"}
        >
          VIDEO
        </button>
      </div>

      {/* bottom controls */}
      <div className="absolute bottom-8 w-full flex items-center justify-center px-10 z-10">
        <button
          onClick={capturePhoto}
          className="w-20 h-20 rounded-full border-4 border-white bg-white/10 active:scale-95 transition"
        />

        <button
          onClick={switchCamera}
          className="absolute right-8 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
