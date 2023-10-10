import React from "react";
import { Box, Typography } from "@mui/material";

import { ParsedData } from "../types";
import OverviewDwells from "./OverviewDwells";
import OverviewConditions from "./OverviewConditions";
import OverviewPaths from "./OverviewPaths";

interface OverviewProps {
  parsedData: ParsedData;
  extendedColors: string[];
}

export const Overview: React.FC<OverviewProps> = ({
  parsedData,
  extendedColors,
}) => {
  const aggregateDataForOverview = () => {
    const pathDistribution: { [key: string]: number } = {};
    const conditionDistribution: { [key: string]: number } = {};

    let totalCount = 0;

    for (const batch of Object.values(parsedData)) {
      for (const [path, data] of Object.entries(batch)) {
        totalCount += data.total;

        pathDistribution[path] = (pathDistribution[path] || 0) + data.total;

        for (const [condition, count] of Object.entries(data.conditions)) {
          conditionDistribution[condition] =
            (conditionDistribution[condition] || 0) + count;
        }
      }
    }

    return {
      totalCount,
      pathDistribution,
      conditionDistribution,
    };
  };

  const overviewData = aggregateDataForOverview();

  return (
    <Box>
      <Typography variant="h4" color="secondary">
        Overall Dataset Summary
      </Typography>
      <Box mt={3}>
        <Typography variant="h6">
          Total Entries: {overviewData.totalCount}
        </Typography>
        <OverviewDwells
          parsedData={parsedData}
          extendedColors={extendedColors}
        />
        <OverviewPaths
          overviewData={overviewData}
          extendedColors={extendedColors}
        />
        <OverviewConditions
          overviewData={overviewData}
          extendedColors={extendedColors}
        />
      </Box>
    </Box>
  );
};

export default Overview;
