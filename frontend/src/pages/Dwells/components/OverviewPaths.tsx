/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface OverviewPathsProps {
  overviewData: any;
  extendedColors: string[];
}

const OverviewPaths: React.FC<OverviewPathsProps> = ({
  overviewData,
  extendedColors,
}) => {
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
        Process Path Distribution
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <PieChart width={400} height={400}>
        <Legend verticalAlign="top" height={16} />
        <Pie
          data={Object.entries(overviewData.pathDistribution).map(
            ([path, count]) => ({
              name: path,
              value: count,
            })
          )}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {Object.entries(overviewData.pathDistribution).map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={extendedColors[index % extendedColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default OverviewPaths;
