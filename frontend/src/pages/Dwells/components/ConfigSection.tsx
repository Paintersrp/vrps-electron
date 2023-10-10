import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface ConfigSectionProps {
  handleCsvUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ handleCsvUpload }) => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Dwells
      </Typography>
      <Card sx={{ marginBottom: "20px", padding: "20px" }}>
        <CardHeader title="Upload CSV" />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Please follow the steps below to visualize your data:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1. Select a CSV file containing your dwell data." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. Ensure the CSV has columns for 'dwell', 'processPath', and 'condition'." />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. Upload and view the interactive visualizations." />
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Upload File
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                hidden
              />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConfigSection;
