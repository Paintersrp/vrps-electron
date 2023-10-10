import React from "react";
import { Box, Card, CardHeader, CardContent, Divider } from "@mui/material";

import { BatchData, ParsedData } from "../types";

import { PieChartComponent } from "./PieChartComponent";
import { ProcessPathBreakdown } from "./ProcessPathBreakdown";
import { Overview } from "./Overview";

const extendedColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#FF9F40",
  "#A463BF",
  "#FFB347",
  "#30BFBF",
  "#FF6B6B",
  "#6A0572",
];

interface ResultsDetailsSectionProps {
  parsedData: ParsedData;
  activeBatch: string | null;
  activeBatchData: BatchData;
}

const ResultsDetailsSection: React.FC<ResultsDetailsSectionProps> = ({
  parsedData,
  activeBatch,
  activeBatchData,
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: "#0d3660",
        mb: 3,
        height: "100%",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      <CardHeader
        title={`Batch Details: ${activeBatch}`}
        titleTypographyProps={{ variant: "h5", color: "secondary" }}
      />
      <Divider sx={{ mb: 3 }} />
      <CardContent>
        {activeBatch === "Overview" ? (
          <Overview parsedData={parsedData} extendedColors={extendedColors} />
        ) : (
          <Box
            sx={{
              position: "relative",
              marginBottom: 3,
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {activeBatch && Object.keys(activeBatchData).length > 0 && (
              <PieChartComponent
                data={Object.keys(activeBatchData).map((key) => {
                  return {
                    name: key,
                    value: activeBatchData[key].total,
                  };
                })}
                extendedColors={extendedColors}
              />
            )}
            <ProcessPathBreakdown
              activeBatchData={activeBatchData}
              extendedColors={extendedColors}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsDetailsSection;
