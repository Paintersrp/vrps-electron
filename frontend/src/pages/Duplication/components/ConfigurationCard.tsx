import React, { useState } from "react";

import {
  TextField,
  Typography,
  Tooltip,
  IconButton,
  CardHeader,
  Card,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import RepeatIcon from "@mui/icons-material/Repeat";
import TransformIcon from "@mui/icons-material/Transform";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ConfigurationCardProps {
  duplicationCount: number;
  setDuplicationCount: (count: number) => void;
}

const ConfigurationCard: React.FC<ConfigurationCardProps> = ({
  duplicationCount,
  setDuplicationCount,
}) => {
  const [configOpen, setConfigOpen] = useState(false);

  const toggleConfig = () => {
    setConfigOpen((prev) => !prev);
  };

  const handleDuplicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setDuplicationCount(value);
    }
  };

  return (
    <Card sx={{ my: 4, px: 3, py: 2 }}>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600} color="primary">
            Configuration
          </Typography>
        }
        action={
          <IconButton size="small" onClick={toggleConfig}>
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        }
        sx={{ paddingBottom: "8px" }}
      />

      <Collapse in={configOpen}>
        <CardContent sx={{ pt: 2, pb: 1 }}>
          <TextField
            fullWidth
            type="number"
            label="Duplication Count"
            variant="standard"
            value={duplicationCount}
            onChange={handleDuplicationChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Specify how many times you want to duplicate each string.">
                    <HelpOutlineIcon color="action" fontSize="small" />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: "20px" }}
          />
          <Typography variant="h5" fontWeight={600} color="primary" mt={2}>
            HOW TO USE
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <TextFieldsIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Entering IDs"
                secondary="Begin by entering the IDs you want to duplicate in the 'Input' section."
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <TransformIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Delimiters"
                secondary="IDs can be separate using commas, semicolons, spaces, or new lines."
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ContentCopyIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Copying Results"
                secondary="Once you're satisfied with the results, click on the 'Copy' icon next to 'Results' to copy the duplicated IDs to your clipboard."
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <RepeatIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Setting Duplication Count"
                secondary="Adjust the 'Duplication Count' slider to set how many times each ID will be duplicated."
              />
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ConfigurationCard;
