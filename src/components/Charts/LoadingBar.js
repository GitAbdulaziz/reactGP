import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import RecommendationCalculator from "./RecommendationCalculator";

const LoadingBar = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);
  const results = useSelector((state) => state.app.results);
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
    if (isVisible && dashboardData) {
      setShowInfo(true);

      const calculator = new RecommendationCalculator(dashboardData, results);
      const recommendationScore = calculator.calculate();
      let progress = 0;

      const interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue < recommendationScore) {
            return prevValue + 1;
          } else {
            clearInterval(interval);
            setShowInfo(false);
            return prevValue;
          }
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [isVisible, dashboardData, results]);

  if (!dashboardData) {
    return <div>Please select a neighborhood in the Search Form.</div>;
  }

  return (
    <Flex direction="column" align="center" justify="center" w="100%" position="relative" minHeight="150px">
      <Box id="loading-bar" className="loading-bar" flex="1" w="100%" mb="6" px="4" position="relative">
        <Box h="6.8em" w="100%" bg="gray.300" borderRadius="md" boxShadow="0 0 0.6em #6A0DAD, 0 0 0.8em #8A2BE2" overflow="hidden" position="relative">
          <Box
            h="100%"
            w={`${value}%`}
            bgGradient="linear(to-r, #4CAF50, #FFEB3B, #FF9800, #F44336)"
            transition="width 0.2s ease-in-out"
          />
        </Box>
        <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" fontSize="2xl" fontWeight="bold" color="white">
          {value}%
        </Text>
      </Box>

      {showInfo && (
        <Box position="absolute" bottom="-40px" w="100%" maxWidth="300px" bg="gray.100" p="20px" borderRadius="md" boxShadow="md" className="progress-info">
          <Text fontSize="md" color="gray.700">
            <strong>نسبة التوصية:</strong> {value}%
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default LoadingBar;
