import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PrimaryButton } from "./Button";

function Camera({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(true);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);
  };

  const startCamera = () => {
    setCameraOn(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const facingMode = isMobile ? "environment" : "user";
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode } })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  };

  useEffect(() => {
    startCamera();
    return () => { stopCamera(); };
  }, []);

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
    onCapture(imageDataUrl);
    stopCamera();
  };

  return (
    <>
      {!cameraOn && (
        <div className="flex justify-center mt-4 w-full">
          <PrimaryButton type="button" size="lg" onClick={startCamera}>
            Turn On Camera
          </PrimaryButton>
        </div>
      )}
      {cameraOn && (
        <>
          <video ref={videoRef} controls={false} autoPlay loop playsInline muted>
            <track kind="captions" />
          </video>
          <div className="flex gap-2 justify-center mt-4 mb-2">
            <PrimaryButton type="button" size="lg" onClick={capturePhoto}>
              Take Photo
            </PrimaryButton>
            <PrimaryButton type="button" variant="secondary" size="lg" onClick={stopCamera}>
              Turn Off Camera
            </PrimaryButton>
          </div>
        </>
      )}
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
    </>
  );
}

Camera.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default Camera;
