import React from "react";
import {
  Box,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  CardHeader,
  Card,
  Divider,
  CardContent,
} from "@mui/material";
import CopyIcon from "@mui/icons-material/FileCopy";

interface ResultsCardProps {
  result: string;
  handleCopy: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ result, handleCopy }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={400} color="secondary">
            Results
          </Typography>
        }
        action={
          <Tooltip arrow title="Copy">
            <IconButton onClick={handleCopy} disabled={!result}>
              <CopyIcon />
            </IconButton>
          </Tooltip>
        }
        sx={{ pl: 3 }}
      />
      <Divider />
      <CardContent>
        <TextField
          label="Duplicated IDs"
          multiline
          fullWidth
          minRows={6}
          variant="outlined"
          value={result}
          InputProps={{
            readOnly: true,
            style: {
              color: "white",
            },
          }}
        />
      </CardContent>
      <Divider />
      <Box p={2} display="flex" justifyContent="flex-end">
        <Tooltip arrow title="Copy">
          <IconButton onClick={handleCopy} disabled={!result}>
            <CopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default ResultsCard;
