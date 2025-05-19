import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

import { PrimaryButton } from "./Button";

function Camera({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

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
        <Row className="mt-3 w-100 justify-content-center text-center">
          <PrimaryButton
            type="button"
            variant="primary"
            size="lg"
            className="w-50"
            onClick={startCamera}
          >
            Turn On Camera
          </PrimaryButton>
        </Row>
      )}
      {cameraOn && (
        <>
          <video
            ref={videoRef}
            width="640"
            height="580"
            controls={false}
            autoPlay
            loop
            playsInline
            muted
          >
            <track kind="captions" />
          </video>
          <Row className="mt-3 w-100 justify-content-center text-center">
            <PrimaryButton
              type="button"
              variant="primary"
              size="lg"
              className="w-50"
              onClick={capturePhoto}
            >
              Take Photo
            </PrimaryButton>
            <PrimaryButton
              type="button"
              variant="secondary"
              size="lg"
              className="w-50 ml-2"
              onClick={stopCamera}
            >
              Turn Off Camera
            </PrimaryButton>
          </Row>
        </>
      )}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
    </>
  );
}

Camera.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default Camera;
