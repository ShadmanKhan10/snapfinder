import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import ClickSelfie from "./pages/ClickSelfie";
import ImageOutput from "./pages/ImageOutput";
import Thankyou from "./pages/Thankyou";

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="work-space-container"
        style={{ height: `${windowHeight}px` }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/click-selfie" element={<ClickSelfie />}></Route>
            <Route path="/image-output" element={<ImageOutput />}></Route>
            <Route path="/thank-you" element={<Thankyou />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
