/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import {
  Cell,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { ParsedData } from "../types";

interface OverviewDwellsProps {
  parsedData: ParsedData;
  extendedColors: string[];
}

const OverviewDwells: React.FC<OverviewDwellsProps> = ({
  parsedData,
  extendedColors,
}) => {
  const createBarChartData = () => {
    return Object.keys(parsedData).map((batch) => {
      const totalCount = Object.values(parsedData[batch]).reduce(
        (acc, curr) => acc + curr.total,
        0
      );
      return { name: batch, count: totalCount };
    });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: "#001F3F",
            padding: "5px",
            borderRadius: "5px",
            textAlign: "left",
          }}
        >
          <Typography>
            <strong>Dwell Range:</strong> {payload[0].payload.name}
          </Typography>
          <Typography>
            <strong>Count:</strong> {payload[0].value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const barChartData = createBarChartData();

  return (
    <Box
      mt={3}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Dwell Time Distribution
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={barChartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis dataKey="name" interval={0} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid strokeDasharray="1 1 1 1" />
          <Bar dataKey="count" animationDuration={500} isAnimationActive={true}>
            {barChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={extendedColors[index % extendedColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OverviewDwells;
