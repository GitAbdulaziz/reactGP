import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { Box, useBreakpointValue } from "@chakra-ui/react";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill="white"
        fontSize="25px"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="rgb(243, 241, 231)"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="rgb(255, 255, 255)"
      >{`القيمة: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="rgb(255, 255, 255)"
      >
        {`النسبة ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default function SectorDistributionChart() {
  const dashboardData = useSelector((state) => state.app.dashboardData);

  const data =
    dashboardData?.["نقاط الاهتمام"]
      ?.slice(4)
      ?.map((item) => ({
        name: item["الفئة"],
        value: parseInt(item["القيمة"], 10),
      })) || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const chartSizes = useBreakpointValue({
    base: { innerRadius: 108, outerRadius: 138 },
    md: { innerRadius: 100, outerRadius: 130 },
    lg: { innerRadius: 100, outerRadius: 130 },
    xl: { innerRadius: 130, outerRadius: 180 },
  });

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Box minWidth="800px">
      <ResponsiveContainer width="100%" height={470}>
        <PieChart>
          <defs>
            <linearGradient id="gradientColors" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A5FECB" />
              <stop offset="50%" stopColor="#20BDFF" />
              <stop offset="100%" stopColor="#5433FF" />
            </linearGradient>
          </defs>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={chartSizes?.innerRadius}
            outerRadius={chartSizes?.outerRadius}
            fill="url(#gradientColors)"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
