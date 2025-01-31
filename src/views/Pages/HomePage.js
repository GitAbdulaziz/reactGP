import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gradient from "../../assets/img/gradient.png";
import WhiteSection from "../../components/WhiteSection/WhiteSection";
import Overview from "../../components/Overview/Overview";
import Navbar from "components/Navbars/Navbar";
import Footer from "components/Footer/Footer";
import "../../styles/HomePage.css"; // Import the updated CSS

const InteractiveLightspeed = ({ opacity }) => {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0002;
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      fade
    />
  );
};

const HomePage = () => {
  const history = useHistory();

  const handleGetStarted = () => {
    history.push("/search");
  };

  return (
    <>
      <Navbar />

      <Box
        bgImage={`url(${gradient})`}
        bgSize="cover"
        bgPosition="center"
        position="relative"
        minH="100vh"
        overflow="hidden"
      >
        <Canvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
          gl={{ alpha: true }}
        >
          <InteractiveLightspeed opacity={0.5} />
        </Canvas>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          position="relative"
          zIndex={2}
          px={8}
          py={16}
        >
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <Box px={75}>
              {/* Added padding to raise the first title */}
              <Heading
                fontSize={{ base: "2xl", md: "4xl", xl: "5xl" }}
                color="white"
                pt={{ base: 2, md: 4 }} 
                pl={{ xl: "230px", md: "230px" }} 
                className="headingSlideEnter" 
              >
                مرحبًا بك
              </Heading>

              {/* Added padding to separate the first subtitle */}
              <Text
                fontSize={{ base: "sm", md: "3xl" }}
                fontFamily="Poppins, sans-serif"
                color="white"
                pt={4} 
                pl={4} 
                className="headingDelayed textTwo" 
              >
                "ابدأ الان بتحليل المواقع المثاليه لشركتك باستخدام تقنيات حديثه"
              </Text>

              {/* Added padding to separate the second title */}
              <Heading
                fontSize={{ base: "2xl", md: "8xl" }}
                fontFamily="Poppins, sans-serif"
                color="white"
                pt={8} 
                pl={4} 
                className="headingSlideEnter" 
              >
                Welcome to BusinessMap
              </Heading>

              {/* Added padding for the second subtitle */}
              <Text
                fontSize={{ base: "sm", md: "3xl" }}
                fontFamily="Poppins, sans-serif"
                color="white"
                pt={4} 
                pl={4} 
                className="text headingDelayedFirst" 
                style={{
                  backgroundColor: "#2e3192",
                  borderColor: "#2e3192", 
                }}
              >
                "Your well-informed decisions start here: an innovative tool for
                market analysis!"
              </Text>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              mt={8} 
            >
              <Box
                as="button" 
                className="btn-grad" 
                onClick={handleGetStarted}
              >
                Get Started
              </Box>
            </Box>
          </Box>

          <Box
            flex="1"
            w={{ base: "1400px", md: "1000px" }}
            maxW="1500px"
            h={{ base: "600px", md: "1000px" }}
            mt={{ base: 12, md: 0 }}
            ml={{ base: 0, md: 4 }}
            px={{ base: 4, md: 8 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spline
              scene="https://prod.spline.design/I1sHrJ9Mx-W8X3oC/scene.splinecode"
              className="responsive-spline jumping-object"
            />
          </Box>
        </Flex>
      </Box>

      <WhiteSection />
      <Overview />
      <Footer />
    </>
  );
};

export default HomePage;
