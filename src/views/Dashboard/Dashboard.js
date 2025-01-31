// Chakra imports
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Icon,
  SimpleGrid,
  Spacer,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text
} from "@chakra-ui/react";
// Styles for the circular progressbar
// Custom components
import { useHistory } from "react-router-dom";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import LineChartData  from "components/Charts/LineChartData";

import SaturationRate from "components/Charts/SaturationRate";

import IconBox from "components/Icons/IconBox";
// Icons
import {

  PeopleLogo,
  ActivitesLogo,
  SalaryLogo,
  MaleLogo,
} from "components/Icons/Icons.js";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useEffect, useState,useRef } from "react";
import { BiHappy } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import {
  IoCheckmarkDoneCircleSharp,
  IoEllipsisHorizontal,IoStar, IoStarOutline
} from "react-icons/io5";
// Data

import SectorDistributionChart from "components/Charts/SectorsDistributions";
import MonthlyIncomeChart from "components/Charts/MonthlyIncomeChart";

import { timelineData } from "variables/general";

import { useSelector } from "react-redux";
import AgeGender from "components/Charts/AgeGender";
import AgeNationality from "components/Charts/AgeNationality";
import LoadingBar from "components/Charts/LoadingBar";

export default function Dashboard() {
  const [markers, setMarkers] = useState([]); 
  const [saturationValue, setSaturationValue] = useState(0);
  const handleSaturationRateChange = (value) => {
    setSaturationValue(value);
  };
  const selectedNeighborhood = useSelector(
    (state) => state.app.selectedNeighborhood
  );

  const history = useHistory();

  useEffect(() => {
    if (!selectedNeighborhood) {
      // Start a timer to redirect after 1 second
      const timer = setTimeout(() => {
        history.push("/warning"); // Navigate to the warning page
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    }
  }, [selectedNeighborhood, history]);

  const dashboardData = useSelector((state) => state.app.dashboardData);

  if (!dashboardData) {
    return <div>Please select a neighborhood in the Search Form.</div>;
  }

  // Map data to the card titles
  const pointsOfInterest = dashboardData["نقاط الاهتمام"];

  // Fetch Saudis Percentage
  const saudisPercentage =
    dashboardData["المعلومات الديموغرافية"]?.find(
      (item) => item["الفئة"] === "سعوديون"
    )?.["القيمة"] || "N/A";

  // Fetch Total Activities
  const totalActivities =
    pointsOfInterest?.find((item) => item["الفئة"] === "عدد نقاط الاهتمام")?.[
      "القيمة"
    ] || "N/A";

  // Fetch Average Income
  const averageIncome =
    dashboardData["متوسط الدخل الشهري"]?.find(
      (item) => item["الفئة"] === "الكل"
    )?.["القيمة"] || "N/A";

  // Fetch Male Percentage
  const malePercentage =
    dashboardData["المعلومات الديموغرافية"]?.find(
      (item) => item["الفئة"] === "ذكور"
    )?.["القيمة"] || "N/A";

  // Fetch Total Population
  const totalPopulation =
    dashboardData["المعلومات الديموغرافية"]?.find(
      (item) => item["الفئة"] === "عدد السكان"
    )?.["القيمة"] || "N/A";

  const overview = [
    totalPopulation,
    totalActivities,
    averageIncome,
    malePercentage,
    saudisPercentage,
    saturationValue,
  ]; 

  // Fetch the top two percentages dynamically, ensuring they are percentages
  const topTwoPercentages = pointsOfInterest
    ?.filter((item) => item["القيمة"].includes("%")) 
    .map((item) => ({
      category: item["الفئة"],
      value: parseFloat(item["القيمة"].replace("%", "")), 
    }))
    .sort((a, b) => b.value - a.value) 
    .slice(0, 2); 

  // Save their values and names for frontend use
  const firstPercentageValue = topTwoPercentages?.[0]?.value || "N/A";
  const firstPercentageName = topTwoPercentages?.[0]?.category || "N/A";

  const secondPercentageValue = topTwoPercentages?.[1]?.value || "N/A";
  const secondPercentageName = topTwoPercentages?.[1]?.category || "N/A";

  const center = useSelector((state) => state.app.center); 
  const results = useSelector((state) => state.app.results); 

  // Calculate average rating and total results
  const totalResults = results.length;
  const averageRating =
    totalResults > 0
      ? results.reduce((sum, result) => sum + (result.rating || 0), 0) /
        totalResults
      : 0;


      const scrollContainerRef = useRef(null);
      useEffect(() => {
        const container = scrollContainerRef.current;
        const isMediumOrSmall = window.innerWidth <= 1500; 
    
        if (container && isMediumOrSmall) {
          const middleScrollPosition =
            (container.scrollWidth - container.clientWidth) / 2; 
          container.scrollLeft = middleScrollPosition; 
        }
      }, []);
    
    

  useEffect(() => {
    if (window.google && center) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 12,
      });

      // Draw a circle around the center
      new window.google.maps.Circle({
        map,
        center,
        radius: 3000, 
        fillColor: "#AA00FF",
        fillOpacity: 0.2,
        strokeColor: "#AA00FF",
        strokeOpacity: 0.4,
        strokeWeight: 2,
      });

      // Add markers for results
      const newMarkers = results.map((result) => {
        const marker = new window.google.maps.Marker({
          position: result.geometry.location,
          map,
          title: result.name,
        });
        return marker; 
      });

      setMarkers(newMarkers); 
    }
  }, [center, results]);

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr" }} gap="24px">
        {/* Google Map Card */}
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="x-large" color="#fff" fontWeight="bold" pb="8px">
                نتائجك التي قمت في البحث عنها :{" "}
                <Text
                  as="span"
                  textDecoration="underline"
                  color="teal.300"
                  cursor="pointer"
                  onClick={() => history.push("/admin/locations")} // Redirect to Locations page
                >
                  {markers.length} نتائج
                </Text>
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="xx-large" color="teal.300" fontWeight="normal">
                  {selectedNeighborhood}
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Box
            id="map"
            height="400px"
            width="100%"
            bg="gray.800"
            borderRadius="md"
          >
            {/* The map will be rendered here */}
          </Box>
        </Card>

        {/* Spacer or Wall */}
        <Box height="20px" />
      </Grid>

      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <Card>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="#fff"
                  fontWeight="bold"
                  pb="2px"
                >
                  نسبة المواطنين السعوديين{" "}
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="#fff">
                    {saudisPercentage}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="brand.200">
                <PeopleLogo h={"24px"} w={"24px"} color="#fff" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="#fff"
                  fontWeight="bold"
                  pb="2px"
                >
                  العدد الكلي للأنشطة العامة{" "}
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="#fff">
                    {totalActivities}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="brand.200">
                <ActivitesLogo h={"24px"} w={"24px"} color="#fff" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat>
                <StatLabel
                  fontSize="sm"
                  color="#fff"
                  fontWeight="bold"
                  pb="2px"
                >
                  متوسط الدخل الفردي
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="#fff">
                    {averageIncome}
                  </StatNumber>
                </Flex>
              </Stat>
              <Spacer />
              <IconBox as="box" h={"45px"} w={"45px"} bg="brand.200">
                <SalaryLogo h={"24px"} w={"24px"} color="#fff" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="#fff"
                  fontWeight="bold"
                  pb="2px"
                >
                  نسبة الذكور من السكان
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="#fff" fontWeight="bold">
                    {malePercentage}
                  </StatNumber>
                
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="brand.200">
                <MaleLogo h={"24px"} w={"24px"} color="#fff" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "1.5fr 0.7fr 1fr 1fr" }}
        my="26px"
        gap="18px"
      >
        {/* Welcome Card */}
        <Card
          p="0px"
          gridArea={{ md: "1 / 1 / 1 / 1", "2xl": "auto" }}
          bgSize="cover"
          bgPosition="50%"
        >
          <CardBody w="100%" h="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%" h="100%">
              <Flex
                flexDirection="column"
                h="100%"
                p="22px"
                minW="60%"
                lineHeight="1.6"
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Welcome back,
                </Text>
                <Text fontSize="28px" color="#fff" fontWeight="bold" mb="12px">
                  إجمالي عدد سكان الحي
                </Text>
                <Text fontSize="45px" color="white" fontWeight="bold" mb="5">
                  {totalPopulation}
                </Text>
                <Spacer />
                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    my={{ sm: "1.5rem", lg: "0px" }}
                  >
                    <Text
                      fontSize="sm"
                      color="#fff"
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .3s ease"
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}
                    >
                      Tab to record
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      color="#fff"
                      fontSize="2xl"
                      transition="all .3s ease"
                      mx=".3rem"
                      cursor="pointer"
                      pt="4px"
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

{/* Average Rating Card */}
<Card gridArea={{ md: "1 / 2 / 1 / 2", "2xl": "auto" }}>
  <CardHeader mb="24px">
    <Flex direction="column">
      <Text color="#fff" fontSize="lg" fontWeight="bold" mb="4px">
        متوسط تقييم النتائج
      </Text>
      <Text color="gray.400" fontSize="sm">
      </Text>
    </Flex>
  </CardHeader>
  <CardBody>
    <Flex
      flexDirection="column"
      align="center"
      justify="flex-start"
      w="100%"
      textAlign="center"
      pt="20px" 
    >
      <Stat>
        <Flex direction="column" align="center">
          {/* Large Evaluation Number */}
          <StatNumber  fontSize={{ base: "4xl", xl: "6xl" ,lg:"5xl"}} 
 color="#fff" fontWeight="bold" mb="8px">
            {averageRating.toFixed(1)} / 5
          </StatNumber>

          {/* Dynamic Stars */}
          <Flex>
            {[...Array(5)].map((_, i) => (
              <Icon
                as={i < Math.round(averageRating) ? IoStar : IoStarOutline}
                key={i}
                color={i < Math.round(averageRating) ? "yellow.400" : "gray.600"}
                w={9}
                h={9}
              />
            ))}
          </Flex>
        </Flex>
      </Stat>
    </Flex>
  </CardBody>
</Card>



        <Card gridArea={{ md: "2 / 1 / 3 / 2", "2xl": "auto" }}>
          <CardHeader mb="24px">
            <Flex direction="column">
              <Text color="#fff" fontSize="lg" fontWeight="bold" mb="4px">
                {firstPercentageName}
              </Text>
              <Text color="gray.400" fontSize="sm">
                From all projects
              </Text>
            </Flex>
          </CardHeader>
          <Flex
            direction="column"
            justify="center"
            align="center"
            position="relative"
            w="100%"
            h="100%"
          >
            <Box zIndex="-1">
              <CircularProgress
                size={{ base: "150px", md: "200px", lg: "250px" }}
                value={80}
                thickness={6}
                color="#582CFF"
                variant="vision"
                rounded
              >
                <CircularProgressLabel>
                  <IconBox
                    mb="20px"
                    mx="auto"
                    bg="brand.200"
                    borderRadius="50%"
                    w={{ base: "36px", md: "48px" }}
                    h={{ base: "36px", md: "48px" }}
                  >
                    <Icon
                      as={BiHappy}
                      color="#fff"
                      w={{ base: "20px", md: "30px" }}
                      h={{ base: "20px", md: "30px" }}
                    />
                  </IconBox>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Stack
              direction="row"
              spacing={{ base: "20px", sm: "42px", md: "68px" }}
              justify="center"
              maxW={{ base: "240px", sm: "270px", md: "300px", lg: "100%" }}
              mx={{ base: "auto", md: "0px" }}
              p={{ base: "12px 16px", md: "18px 22px" }}
              bg="linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgba(10, 14, 35) 91.2%)"
              borderRadius="20px"
              position="absolute"
              bottom={{ base: "2%", md: "5%" }}
            >
              <Text fontSize={{ base: "10px", md: "xs" }} color="gray.400">
                0%
              </Text>
              <Flex direction="column" align="center" minW="80px">
                <Text
                  color="#fff"
                  fontSize={{ base: "20px", md: "28px" }}
                  fontWeight="bold"
                >
                  {firstPercentageValue}%
                </Text>
                <Text
                  fontSize={{ base: "10px", md: "sm" }}
                  color="gray.400"
                  textAlign="center"
                >
                  بناء على {firstPercentageName}
                </Text>
              </Flex>
              <Text fontSize={{ base: "10px", md: "xs" }} color="gray.400">
                100%
              </Text>
            </Stack>
          </Flex>
        </Card>

        <Card gridArea={{ md: "2 / 2 / 3 / 3", "2xl": "auto" }}>
          <Flex direction="column">
            <Flex justify="space-between" align="center" mb="40px">
              <Text color="#fff" fontSize="lg" fontWeight="bold">
                {secondPercentageName}
              </Text>
              <Button
                borderRadius="12px"
                w="38px"
                h="38px"
                bg="#22234B"
                _hover="none"
                _active="none"
              >
                <Icon as={IoEllipsisHorizontal} color="#7551FF" />
              </Button>
            </Flex>
            <Flex
              direction="column"
              justify="center"
              align="center"
              w="100%"
              h="100%"
              mt={{ base: "10px", md: "20px" }}
            >
              <Box
                mx={{ sm: "auto", md: "0px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                w={{ base: "150px", md: "200px", lg: "250px" }}
                h={{ base: "150px", md: "200px", lg: "250px" }}
              >
                <CircularProgress
                  size={{ base: "180px", md: "200px", lg: "250px" }}
                  value={70}
                  thickness={6}
                  color="#05CD99"
                  variant="vision"
                >
                  <CircularProgressLabel>
                    <Flex
                      direction="column"
                      justify="center"
                      align="center"
                      w="100%"
                      textAlign="center"
                    >
                      <Text
                        color="gray.400"
                        fontSize={{ base: "10px", md: "12px" }}
                        mb="4px"
                      />
                      <Text
                        color="#fff"
                        fontSize={{ base: "30px", md: "30px", lg: "42px" }}
                        fontWeight="bold"
                        mb="4px"
                      >
                        {secondPercentageValue}%
                      </Text>
                      <Text
                        color="gray.400"
                        fontSize={{ base: "15px", md: "17px", lg: "20px" }}
                        mt="4px"
                      >
                        من الاجمالي
                      </Text>
                    </Flex>
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
            </Flex>
          </Flex>
        </Card>
      </Grid>

      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "0.7fr 1.3fr" }}
        gap="24px"
        mb="24px"
      >

<Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
              صفقات المبيعات في الرياض و حي {selectedNeighborhood}
              {" "}
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Box w="100%" minH={{ sm: "300px" }} pt="60px">
          <LineChartData neighborhood = {selectedNeighborhood}/>
          </Box>
        </Card>

        {/* Active Users */}
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
                متوسط الدخل الشهري للفرد العامل{" "}
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                    {/* قطاع11 */}
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Box w="100%" minH={{ sm: "300px" }} pt="60px">
            <MonthlyIncomeChart></MonthlyIncomeChart>
          </Box>
        </Card>
      </Grid>

      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "0.7fr 1fr" }}
        gap="24px"
        mb="32px" 
      >
        <Card p="16px" h="700px" overflowX="auto" ref={scrollContainerRef}>
      <CardHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color="#fff" fontWeight="bold" pb="8px">
            توزيع القطاعات حسب عدد الأنشطة في الحي
          </Text>
          <Flex align="center">
            <Icon
              as={IoCheckmarkDoneCircleSharp}
              color="teal.300"
              w={4}
              h={4}
              pe="3px"
            />
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              <Text fontWeight="bold" as="span">
                قطاع11
              </Text>
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <Box w="100%" minH="300px" display="flex" justifyContent="center">
        <SectorDistributionChart />
      </Box>
    </Card>




        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" pb="8px">
                توزيع السكان وفق الفئات العمرية والجنس
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Box w="100%" minH={{ sm: "300px" }}>
            <AgeGender />
          </Box>
        </Card>
      </Grid>

      {/* ------ */}

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "2fr 1.1fr",
          xl: "2fr 0.5fr",
        }}
        gap="24px"
        mb="24px"
      >
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" pb="8px">
                توزيع السكان بحسب الفئات العمرية والجنسية
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                    اضغط على سلاسل البيانات للتصفية
                  </Text>{" "}
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Box w="100%" minH={{ sm: "300px" }}>
            <AgeNationality />
          </Box>
        </Card>

        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
                مؤشر التشيع في المنطقة
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Box w="100%" minH={{ sm: "300px" }}>
            <SaturationRate
              onSaturationRateChange={handleSaturationRateChange}
            />
          </Box>
        </Card>
      </Grid>

      <Grid
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "2fr 1fr",
          xl: "5fr 1fr",
        }}
        gap="24px"
      >
        {/* Projects */}
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }} minH="400px">
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text fontSize="x-large" color="#fff" fontWeight="bold" pb="8px">
                النسبة الموصى بها لاتخاذ القرار لفتح المشروع (لرواد الاعمال)
              </Text>
              <Flex align="center">
                <Icon
                  as={IoCheckmarkDoneCircleSharp}
                  color="teal.300"
                  w={4}
                  h={4}
                  pe="3px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                  تم احتساب هذه النسبة استنادًا إلى المعلومات المدرجة في الصفحة وعمليات حسابية تقريبية.
                   يُرجى ملاحظة أن هذه النسبة تُعد إرشادية فقط ولا ينبغي الاعتماد عليها كمعيار دقيق، فهي مجرد توصيات استرشادية                  </Text>{" "}
                </Text>
              </Flex>
              <Flex align="center">
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="300px"
          >
            <Box w="100%" maxW="2500px">
              <LoadingBar />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader mb="32px">
            <Flex direction="column ">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
                ملخص يساعدك باتخاذ قرارك النهائي
              </Text>
              
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" lineHeight="21px" alignItems="end">
              {timelineData.map((row, index, arr) => {
                return (
                  <TimelineRow
                    key={index} 
                    title={row.title}
                    date={row.date}
                    index={index}
                    arrLength={arr.length}
                    align="flex-end" 
                    textAlign="right" 
                    totalPopulation={overview[index]} 
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
