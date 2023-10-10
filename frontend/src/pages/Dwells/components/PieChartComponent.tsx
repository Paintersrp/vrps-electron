/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import React from "react";
import { Box } from "@mui/material";

interface PieChartComponentProps {
  data: { name: string; value: number }[];
  onPieEnter?: (_: any, index: number) => void;
  activeIndex?: number | null;
  extendedColors: string[];
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  onPieEnter,
  activeIndex,
  extendedColors,
}) => (
  <Box sx={{ width: 400, height: 400, margin: "0 auto", position: "relative" }}>
    <PieChart width={400} height={400}>
      <Legend verticalAlign="top" height={16} />
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        activeIndex={activeIndex || undefined}
      >
        {data.map((_, index) => (
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

export default PieChartComponent;
