import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Grid, Spinner } from "@chakra-ui/react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

// Function to trigger scraping
const scrapeData = (neighborhoodName, dateRange) => {
  fetch("https://businessmap-me.live/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ neighborhoodName, dateRange }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(`Scraping completed for ${neighborhoodName || "Riyadh"}:`, data);
    })
    .catch((error) => {
      console.error("Error fetching data in background:", error.message);
    });
};

// Chart Options Generator
const getChartOptions = (data, title, isArea, color, unit) => {
  const yLabel = isArea
    ? `إجمالي المساحة (${unit})`
    : `إجمالي قيمة الصفقات (${unit})`;
  return {
    chart: { type: "column", backgroundColor: "transparent" },
    title: { text: title, style: { color: "#fff" } },
    xAxis: {
      categories: [data.deals.toString()],
      labels: {
        style: { color: "#c8cfca", fontWeight: "bold" },
        formatter: function () {
          return `الصفقات: ${this.value}`;
        },
      },
    },
    yAxis: {
      title: { text: yLabel, style: { color: "#c8cfca" } },
      labels: {
        style: { color: "#c8cfca" },
        formatter: function () {
          return `${this.value} ${unit}` ;
        },
      },
    },
    tooltip: {
      useHTML: true, 
      formatter: function () {
        const deals = data.deals.toString(); 

        return `
          <div style="text-align: right; color: #000;"> الصفقات:
            <span style="font-weight: bold;">  ${deals} </span><br />
            <span>${this.series.name}: <b>${this.y.toFixed(2)} ${unit}</b></span>
          </div>
        `;
      },
      backgroundColor: "#fff", 
      borderColor: "#ccc", 
      style: { color: "#000", fontSize: "12px" }, 
    },
    series: [
      {
        name: "البيانات",
        data: [isArea ? data.totalAreas : data.totalValues],
        color: color,
        dataLabels: {
          enabled: true,
          style: { color: "#fff", fontWeight: "bold" },
          formatter: function () {
            return `${this.y.toFixed(2)} ${unit}`;
          },
        },
      },
    ],
  };
};

// Main Component
const LineChartData = ({ neighborhood }) => {
  const [isArea, setIsArea] = useState(false);
  const [dateRange, setDateRange] = useState("365");
  const [riyadhData, setRiyadhData] = useState(null);
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temporaryLoading, setTemporaryLoading] = useState(false);
  const [areaUnit, setAreaUnit] = useState("مليون");
  const [valueUnit, setValueUnit] = useState("مليار");
  const [areaUnitN, setAreaUnitN] = useState("مليون");
  const [valueUnitN, setValueUnitN] = useState("مليار");
  // Fetch and Parse Data
  const fetchData = async () => {
    try {
      const response = await fetch("https://businessmap-me.live/data");
      const data = await response.json();
  
      // Compare the fetched data with the existing state before updating
      let shouldUpdate = false;
  
      // Check Riyadh data
      if (data.riyadh) {
        const newRiyadhData = {
          deals: data.riyadh.TotalDeals,
          totalValues: parseFloat(data.riyadh.totalValues.replace(/[^0-9.,]/g, "").replace(",", ".")),
          totalAreas: parseFloat(data.riyadh.totalAreas.replace(/[^0-9.,]/g, "").replace(",", ".")),
        };
  
        if (JSON.stringify(newRiyadhData) !== JSON.stringify(riyadhData)) {
          setRiyadhData(newRiyadhData);
          setAreaUnit(data.riyadh.totalAreas.includes("ألف") ? "ألف" :
                      data.riyadh.totalAreas.includes("مليون") ? "مليون" : "مليار");
          setValueUnit(data.riyadh.totalValues.includes("ألف") ? "ألف" :
                       data.riyadh.totalValues.includes("مليون") ? "مليون" : "مليار");
          shouldUpdate = true;
        }
      }
  
      // Check Neighborhood data
      if (data.neighborhood) {
        const newNeighborhoodData = {
          deals: data.neighborhood.TotalDeals,
          totalValues: parseFloat(data.neighborhood.totalValues.replace(/[^0-9.,]/g, "").replace(",", ".")),
          totalAreas: parseFloat(data.neighborhood.totalAreas.replace(/[^0-9.,]/g, "").replace(",", ".")),
        };
  
        if (JSON.stringify(newNeighborhoodData) !== JSON.stringify(neighborhoodData)) {
          setNeighborhoodData(newNeighborhoodData);
          setAreaUnitN(data.neighborhood.totalAreas.includes("ألف") ? "ألف" :
                      data.neighborhood.totalAreas.includes("مليون") ? "مليون" : "مليار");
          setValueUnitN(data.neighborhood.totalValues.includes("ألف") ? "ألف" :
                       data.neighborhood.totalValues.includes("مليون") ? "مليون" : "مليار");
          shouldUpdate = true;
        }
      }
  
      // Only set loading states if there was an update
      if (shouldUpdate) {
        setLoading(false);
        setTemporaryLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setTemporaryLoading(false);
    }
  };
  

  // Fetch data on mount and periodically
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 4000);
    return () => clearInterval(intervalId);
  }, [dateRange]);

  const handleDateRangeChange = () => {
    const newDateRange = dateRange === "365" ? "90" : "365";
    setLoading(true);

    setDateRange(newDateRange);
    setTemporaryLoading(true);
    scrapeData(neighborhood, newDateRange);
  };

  const riyadhOptions = riyadhData
    ? getChartOptions(
        riyadhData,
        "بيانات الرياض",
        isArea,
        "rgba(79, 216, 240, 0.9)",
        isArea ? areaUnit : valueUnit
      )
    : null;

  const neighborhoodOptions = neighborhoodData
    ? getChartOptions(
        neighborhoodData,
        "بيانات الحي",
        isArea,
        "rgba(142, 63, 233, 0.9)",
        isArea ? areaUnitN : valueUnitN
      )
    : null;

  return (
    <Box w="100%">
      <Flex justifyContent="space-between" mb="20px" alignItems="center">
        <Text fontSize="lg" color="#fff" fontWeight="bold">
          {isArea
            ? "عرض مجموع المساحة مقابل عدد الصفقات"
            : "عرض إجمالي قيمة الصفقات مقابل عدد الصفقات"}
        </Text>
        <Flex gap="10px">
          <Button
            colorScheme="blue"
            onClick={handleDateRangeChange}
            size="md"
          >
            {dateRange === "365" ? "عرض فترة 90 يوم" : "عرض فترة 365 يوم"}
          </Button>
          <Button
            colorScheme="purple"
            onClick={() => setIsArea(!isArea)}
            size="md"
          >
            {isArea ? "عرض إجمالي القيمة" : "عرض إجمالي المساحة"}
          </Button>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          {loading || !riyadhOptions ? (
            <Spinner size="lg" color="purple.500" />
          ) : (
            <HighchartsReact highcharts={Highcharts} options={riyadhOptions} />
          )}
        </Box>
        <Box>
          {temporaryLoading || loading ? (
            <Spinner size="lg" color="purple.500" />
          ) : neighborhoodOptions ? (
            <HighchartsReact
              highcharts={Highcharts}
              options={neighborhoodOptions}
            />
          ) : (
            <Spinner size="lg" color="purple.500" />

          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default LineChartData;
