import React from "react";
import {
  TextField,
  Typography,
  Tooltip,
  IconButton,
  CardHeader,
  Card,
  Divider,
  CardContent,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

interface InputCardProps {
  inputStr: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
}

const InputCard: React.FC<InputCardProps> = ({
  inputStr,
  handleInputChange,
  handleClear,
}) => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={400} color="secondary">
            Input
          </Typography>
        }
        action={
          <Tooltip arrow title="Clear">
            <IconButton onClick={handleClear} disabled={!inputStr}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        }
        sx={{ pl: 3 }}
      />
      <Divider />
      <CardContent>
        <TextField
          label="Enter IDs"
          multiline
          fullWidth
          minRows={6}
          variant="outlined"
          value={inputStr}
          onChange={handleInputChange}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default InputCard;
