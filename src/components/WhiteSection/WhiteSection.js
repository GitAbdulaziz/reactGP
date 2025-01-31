import React, { useState, useEffect } from "react";
import "../../styles/WhiteSection.css";
import Spline from "@splinetool/react-spline";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dashboardImage from "../../assets/img/dashboard.png";
import locationImage from "../../assets/img/location.png";

const WhiteSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(dashboardImage);
  const animation = useAnimation();

  useEffect(() => {
    const imageSwitchInterval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === dashboardImage ? locationImage : dashboardImage
      );
    }, 1000); // Switch images every 1 second

    return () => clearInterval(imageSwitchInterval);
  }, []);

  useEffect(() => {
    if (inView) {
      animation.start({
        scale: 1,
        x: 0,
        opacity: 1,
        backgroundColor: "#00031A",
        transition: { duration: 1.5, ease: "easeOut" },
      });
    } else {
      animation.start({
        scale: 0.8,
        x: -100,
        opacity: 0,
        backgroundColor: "#00031A",
      });
    }
  }, [inView, animation]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#00031A" }}>
      <motion.div
        ref={ref}
        animate={animation}
        initial={{ scale: 0.8, x: -100, opacity: 0, backgroundColor: "#00031A" }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        {!isLoaded && (
          <img
            src={currentImage}
            alt="Loading..."
            className="loading-placeholder"
            style={{ position: "absolute", zIndex: 1 }}
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ zIndex: 2, width: "100%", height: "100%" }}
        >
          <Spline
            scene="https://prod.spline.design/h2pMWdvZWBNLb5uM/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhiteSection;
