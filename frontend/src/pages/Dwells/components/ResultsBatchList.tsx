import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { ParsedData } from "../types";

interface ResultsBatchListProps {
  setActiveBatch: (batch: string | null) => void;
  activeBatch: string | null;
  parsedData: ParsedData;
}

const ResultsBatchList: React.FC<ResultsBatchListProps> = ({
  setActiveBatch,
  activeBatch,
  parsedData,
}) => {
  return (
    <Card
      sx={{
        mb: 3,
        height: "100%",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: "1px solid #2a4e73",
      }}
    >
      <CardHeader title="Dwell Time Batches" />
      <Divider />
      <CardContent>
        <List sx={{ py: 0 }}>
          <ListItemButton
            onClick={() => setActiveBatch("Overview")}
            selected={"Overview" === activeBatch}
            sx={{ mb: 1, borderRadius: "4px" }}
          >
            <ListItemText primary="Overview" />
          </ListItemButton>
          {Object.keys(parsedData)
            .sort()
            .reverse()
            .map((batch) => (
              <ListItemButton
                key={batch}
                onClick={() => setActiveBatch(batch)}
                selected={batch === activeBatch}
                sx={{ mb: 1, borderRadius: "4px" }}
              >
                <ListItemText primary={batch} />
              </ListItemButton>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ResultsBatchList;
