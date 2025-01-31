import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    return (
      <div style={{ background: "#fff", padding: "10px", border: "1px solid #ccc" }}>
        <p>{`الفئة العمرية: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
        <p><strong>{`المجموع: ${total}`}</strong></p>
      </div>
    );
  }
  return null;
};

const AgeGender = () => {
  const dashboardData = useSelector((state) => state.app.dashboardData);

  const rawAgeGenderData = dashboardData?.["بيانات السكان حسب فئات العمر والجنس"] || [];

  const transformedData = rawAgeGenderData.reduce((acc, item) => {
    const ageGroup = item["الفئة_العمرية"];
    const gender = item["الجنس"];
    const size = item["الحجم"];
  
    let existingGroup = acc.find((group) => group.ageGroup === ageGroup);
    if (!existingGroup) {
      existingGroup = { ageGroup, male: 0, female: 0 };
      acc.push(existingGroup);
    }
  
    if (gender === "ذكور") {
      existingGroup.male += size;
    } else if (gender === "إناث") {
      existingGroup.female += size;
    }
  
    return acc;
  }, []);
  
  // Ensure all age groups are represented, even with 0 values
  const allAgeGroups = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69","70-79", "+80"];
  allAgeGroups.forEach((group) => {
    if (!transformedData.find((data) => data.ageGroup === group)) {
      transformedData.push({ ageGroup: group, male: 0, female: 0 });
    }
  });
  

  return (
    <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" p="20px">
      <Box flex="1" width="100%" maxWidth="1000px" height="500px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            {/* Neon Filters */}
            <defs>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="maleNeonGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0800FF " />
                <stop offset="100%" stopColor="#E32BE3 " />
              </linearGradient>
              <linearGradient id="femaleNeonGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0800FF " />
                <stop offset="100%" stopColor="#00F6FD " />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" interval={0} tick={{ angle: -30, dy: 10 }} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ marginBottom: -50 , color: "white"}} />
            {/* Bars with Neon Effect */}
            <Bar
              dataKey="male"
              stackId="a"
              fill="url(#maleNeonGradient)"
              name="ذكور"
              style={{ filter: "url(#neonGlow)" }}
            />
            <Bar
              dataKey="female"
              stackId="a"
              fill="url(#femaleNeonGradient)"
              name="إناث"
              style={{ filter: "url(#neonGlow)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
};

export default AgeGender;
