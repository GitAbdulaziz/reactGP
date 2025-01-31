import React, { useRef } from "react";
import Spline from "@splinetool/react-spline";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Overview() {
  const [ref, inView] = useInView({ threshold: 0.2 }); // Detect when Spline is in view
  const animation = useAnimation();

  React.useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      });
    } else {
      animation.start({
        opacity: 0,
        y: 50,
      });
    }
  }, [inView, animation]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#00031A", 
      }}
    >
      {/* Animated Spline Scene */}
      <motion.div
        ref={ref}
        animate={animation}
        initial={{ opacity: 0, y: 50 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", 
          backgroundColor: "#00031A", 
        }}
      >
        <Spline scene="https://prod.spline.design/vSi8AMJHNdjYjxT8/scene.splinecode" />
      </motion.div>
    </div>
  );
}
