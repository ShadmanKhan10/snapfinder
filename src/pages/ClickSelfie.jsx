import React, { Fragment, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

import homeB from "../assets/images/homeB.png";
import Lottie from "react-lottie-player";
import captureImg from "../assets/images/capture.png";
import rotateImg from "../assets/images/rotate.png";
import animationData from "../assets/images/scan.json";

function ClickSelfie() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [isCamera, setIsCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [capturedImage, setCapturedImage] = useState("");

  useEffect(() => {
    setIsCamera(true);
    setPageReady(true);
  }, []);

  const capture = () => {
    let imageSrc;

    imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage(imageSrc);
    searchImage(imageSrc);
    navigate("/image-output", {
      state: { imageList: res.data.matchedArray },
    });
  };

  const toggleCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const searchImage = (imageData) => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/search-face", {
        image: imageData,
      })
      .then((res) => {
        if (res.data.matchedArray.length === 0) {
          toast.error("Sorry! No image found for you");
          setLoading(false);
          setCapturedImage();
        } else {
          navigate("/image-output", {
            state: { imageList: res.data.matchedArray },
          });
        }
      })
      .catch((err) => {
        setCapturedImage();
        toast.error("Sorry! There are no faces in the image");
      });
  };

  if (!pageReady) {
    return null;
  }

  return (
    <>
      {!capturedImage && (
        <Fragment>
          <div className="homeIconContainer">
            <img
              src={homeB}
              alt="homeB"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="selfieInstruction">Let’s take a selfie</div>
          <div className="camera-container">
            <Webcam
              mirrored={true}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: facingMode,
              }}
              className="camera-box"
            />
            <button onClick={capture} className="capture-button">
              <img src={captureImg} alt="Capture" />
            </button>
            <button onClick={toggleCamera} className="rotate-button">
              <img src={rotateImg} alt="Capture" />
            </button>
          </div>
        </Fragment>
      )}
      {capturedImage && (
        <Fragment>
          <div className="homeIconContainer">
            <img src={homeB} alt="homeB" />
          </div>
          <div className="selfieInstruction">Searching for your photos</div>
          <div className="camera-container">
            <div className="preview-img">
              <img src={capturedImage} alt="Image" />
              <Lottie
                loop
                animationData={animationData}
                play
                className="animationBox"
              />
            </div>
          </div>
        </Fragment>
      )}
      <Toaster position="bottom-center" />
    </>
  );
}

export default ClickSelfie;
