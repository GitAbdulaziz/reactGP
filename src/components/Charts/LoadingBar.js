import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const LoadingBar = () => {
  const [value, setValue] = useState(0); 
  const [isVisible, setIsVisible] = useState(false); 
  const [showInfo, setShowInfo] = useState(false); 
  const max = 48; // Maximum progress value

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("loading-bar");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShowInfo(true); 
      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue < max) {
            return prevValue + 1; // Increment progress value
          } else {
            clearInterval(interval); // Clear interval when max is reached
            setShowInfo(false); 
            return prevValue;
          }
        });
      }, 80); // Adjust the speed of the progress bar

      return () => clearInterval(interval); 
    }
  }, [isVisible, max]);

  const handleMouseEnter = () => {
    setShowInfo(true); 
  };

  const handleMouseLeave = () => {
    if (value >= max) {
      setShowInfo(false); 
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="100%"
      position="relative" 
      minHeight="150px" 
    >
      {/* Progress Bar */}
      <Box
        id="loading-bar"
        className="loading-bar"
        flex="1"
        w="100%" 
        mb="6"
        px="4"
        position="relative"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      >
        {/* Gradient Background for the Progress Bar */}
        <Box
          h="6.8em" 
          w="100%"
          bg="gray.300" 
          borderRadius="md"
          boxShadow="0 0 0.6em #6A0DAD, 0 0 0.8em #8A2BE2"
          overflow="hidden"
          position="relative"
        >
          {/* Filled Part */}
          <Box
            h="100%"
            w={`${value}%`}
            bgGradient="linear(to-r, #9019ec, #a30ee2, #b203d8, #bf00cf, #c900c6, #c400c4, #bf00c2, #ba00c0)"
            transition="width 0.2s ease-in-out"
          />
        </Box>

        {/* Centered Progress Text */}
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="2xl"
          fontWeight="bold"
          color="white"
        >
          {value}%
        </Text>
      </Box>

      {/* Progress Info */}
      {showInfo && ( 
        <Box
          position="absolute" 
          bottom="-40px" 
          flex="1"
          w="100%"
          maxWidth="300px"
          bg="gray.100"
          p="20px"
          borderRadius="md"
          boxShadow="md"
          className="progress-info"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="md" color="gray.700">
            <strong>نسبة التقدم الحالي:</strong> {value}%
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default LoadingBar;
