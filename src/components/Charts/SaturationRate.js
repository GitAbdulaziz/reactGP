import React, { useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useSelector } from "react-redux";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";

const RADIAN = Math.PI / 180;

const needle = (value, data, cx, cy, iR, oR, color) => {
  const total = 100; // Use a fixed total for percentage (0 to 100%)
  const angle = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * angle);
  const cos = Math.cos(-RADIAN * angle);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key="needle-circle" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
      key="needle-path"
    />,
  ];
};

const SaturationRate = ({ onSaturationRateChange }) => {
  const dashboardData = useSelector((state) => state.app.dashboardData);
  const results = useSelector((state) => state.app.results);
  const totalBusinesses = results.length;
  const totalPopulation = dashboardData?.["المعلومات الديموغرافية"]?.find(
    (item) => item["الفئة"] === "عدد السكان"
  )?.["القيمة"] || 0;

  const saturationRate = totalPopulation > 0 ? (totalBusinesses / totalPopulation) * 100000 : 0;
  const value = saturationRate;

  const chartSize = useBreakpointValue({ base: 280, md: 280, lg: 460 }); // Adjust based on screen size
  const cx = chartSize / 2; 
  const cy = chartSize / 2; 
  const iR = chartSize / 6; 
  const oR = chartSize / 3; 

  const colorSegments = [
    { value: 25, color: "#4CAF50" }, 
    { value: 25, color: "#FFEB3B" }, 
    { value: 25, color: "#FF9800" },
    { value: 25, color: "#F44336" }, 
  ];

  const pieData = colorSegments.map((segment, index) => ({
    name: `Segment-${index + 1}`,
    value: segment.value,
    color: segment.color,
  }));

  // Call the parent's callback function when the saturationRate is calculated
  useEffect(() => {
    const formattedValue = `%${saturationRate.toFixed(2)}`;
    onSaturationRateChange(formattedValue);
  }, [saturationRate, onSaturationRateChange]);

  return (
    <Box
      p={4}
      w="full"
      h="full"
      textAlign="center"
      color="white"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <PieChart width={chartSize} height={chartSize / 2}>
          <Pie
            data={pieData}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            startAngle={180}
            endAngle={0}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, pieData, cx, cy, iR, oR, "#fff")}
        </PieChart>
      </Box>
      <Text fontSize="lg" mt={4}>
        {`معدل التشبع الحالي:% ${saturationRate.toFixed(2)}`}
      </Text>
    </Box>
  );
};

export default SaturationRate;
