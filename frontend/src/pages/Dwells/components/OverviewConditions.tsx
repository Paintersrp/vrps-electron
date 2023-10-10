/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, Divider } from "@mui/material";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface OverviewConditionsProps {
  overviewData: any;
  extendedColors: string[];
}

const OverviewConditions: React.FC<OverviewConditionsProps> = ({
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
        Condition Distribution
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <PieChart width={400} height={400}>
        <Legend verticalAlign="top" height={16} />
        <Pie
          data={Object.entries(overviewData.conditionDistribution).map(
            ([condition, count]) => ({
              name: condition,
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
          {Object.entries(overviewData.conditionDistribution).map(
            (_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={extendedColors[index % extendedColors.length]}
              />
            )
          )}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default OverviewConditions;
