import React from "react";
import { Card, Typography, Box, LinearProgress } from "@mui/material";
import { BatchData } from "../types";

interface ProcessPathBreakdownProps {
  activeBatchData: BatchData;
  extendedColors: string[];
}

export const ProcessPathBreakdown: React.FC<ProcessPathBreakdownProps> = ({
  activeBatchData,
  extendedColors,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom sx={{ paddingTop: 16 }}>
        Process Path Breakdown
      </Typography>
      {Object.keys(activeBatchData).map((path, index) => (
        <Card variant="outlined" sx={{ mt: 4, p: 2 }}>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
            sx={{ color: extendedColors[index % extendedColors.length] }}
          >
            {path}
          </Typography>

          <Typography variant="body2" gutterBottom>
            Condition Distribution:
          </Typography>
          {Object.entries(activeBatchData[path].conditions).map(
            ([conditionName, count]) => (
              <Box
                key={conditionName}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {conditionName}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(count / activeBatchData[path].total) * 100}
                  sx={{ flexGrow: 2, mx: 2 }}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {Math.round((count / activeBatchData[path].total) * 100)}%
                </Typography>
              </Box>
            )
          )}
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ProcessPathBreakdown;
