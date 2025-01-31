import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@chakra-ui/react";

// Triangle Path for Custom Bars
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} 
          ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} 
          ${x + width}, ${y + height}Z`;
};

// Custom Bar Component
const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Custom Tooltip Formatter
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="#333" color="white" p="5px 10px" borderRadius="5px" boxShadow="lg">
        <div>{label}</div>
        <div>SAR: {payload[0].value}</div>
      </Box>
    );
  }
  return null;
};

// Custom Tick Component
const CustomTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16} 
        textAnchor="middle"
        fill="white"
        fontSize={13}
        fontWeight="bold"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function MonthlyIncomeChart() {
  // Fetch data from Redux
  const dashboardData = useSelector((state) => state.app.dashboardData);

  const data =
    dashboardData?.["متوسط الدخل الشهري"]?.map((item) => ({
      name: item["الفئة"],
      uv: parseInt(item["القيمة"], 10),
    })) || [];

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box w="100%" bg="transparent" p={4}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 50, 
          }}
          barGap={5}
          barCategoryGap={15}
        >
          {/* Background Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          {/* X-Axis */}
          <XAxis
            dataKey="name"
            tick={isSmallScreen ? false : <CustomTick />} 
            axisLine={{ stroke: "white" }}
            tickLine={{ stroke: "white" }}
          />

          {/* Y-Axis */}
          <YAxis
            tick={{ fill: "white", fontSize: 12 }}
            axisLine={{ stroke: "white" }}
            tickLine={{ stroke: "white" }}
          />

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Gradient for Bar Fill */}
          <defs>
  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="rgb(255, 255, 255, 0.7)" />
    <stop offset="100%" stop-color="rgb(44, 217, 255, 0.9)" />
  </linearGradient>
    </defs>

          {/* Bars */}
          <Bar
            dataKey="uv"
            fill="url(#gradient)"
            shape={<TriangleBar />}
            label={{
              position: "top",
              fill: "white",
              fontSize: 12,
            }}
            barSize={50} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
