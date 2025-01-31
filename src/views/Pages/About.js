import React from "react";
import { motion } from "framer-motion";
// Import useHistory to navigate on button click
import { useHistory } from "react-router-dom";

import NavBar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../styles/About.css"; // Your custom About page styling


// Create motion-wrapped HTML elements
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionButton = motion.button;

const About = () => {
  // React Router's navigation hook
  const history = useHistory();

  return (
    <>
      <NavBar />

      
      <MotionDiv
        className="about-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 
          Inner container with slide-up animation 
        */}
        <MotionDiv
          className="about-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          {/* Slide-in for heading from the left */}
          <MotionH1
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            About BusinessMap
          </MotionH1>

          {/* Slide-in for subheading from the right */}
          <MotionH2
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Navigating Business Opportunities with Ease
          </MotionH2>

          {/* Fade in paragraph 1 */}
          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            BusinessMap is a location-based platform designed to help businesses and
            individuals navigate opportunities with ease. We aim to simplify
            location data and deliver actionable insights, bridging the gap
            between customers and local services.
          </MotionP>

          {/* Fade in paragraph 2 (slight extra delay) */}
          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Founded in 2025 by a team of tech enthusiasts, BusinessMap started as a
            small project helping local entrepreneurs connect with nearby
            customers. Today, our platform supports millions of searches,
            delivering real-time analytics to users worldwide.
          </MotionP>

          {/* Scale-in button - navigate to /contact on click */}
          <MotionButton
            className="contact-button"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onClick={() => history.push("/contact")}
          >
            Contact Us
          </MotionButton>
        </MotionDiv>
      </MotionDiv>

      <Footer />
    </>
    
  );
};

export default About;
