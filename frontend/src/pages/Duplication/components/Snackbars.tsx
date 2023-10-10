/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Snackbar, Alert as MUIAlert } from "@mui/material";

interface SnackbarsProps {
  copied: boolean;
  cleared: boolean;
  theme: any;
  setCopied: any;
  setCleared: any;
}

const Alert = (props: any) => {
  return (
    <MUIAlert
      elevation={6}
      variant="filled"
      sx={{
        borderRadius: props.theme.shape.borderRadius,
        color: props.theme.palette.text.primary,
        fontWeight: "bold",
        "& .MuiAlert-icon": {
          fontSize: "1.2rem",
          marginRight: props.theme.spacing(1),
        },
      }}
      {...props}
    />
  );
};

const Snackbars: React.FC<SnackbarsProps> = ({
  copied,
  cleared,
  theme,
  setCopied,
  setCleared,
}) => {
  return (
    <React.Fragment>
      <Snackbar
        TransitionProps={{ appear: false, enter: false, exit: false }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
      >
        <Alert severity="success" theme={theme} sx={{ color: "white" }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
      <Snackbar
        TransitionProps={{ appear: false, enter: false, exit: false }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={cleared}
        autoHideDuration={3000}
        onClose={() => setCleared(false)}
      >
        <Alert severity="info" theme={theme} sx={{ color: "white" }}>
          Input cleared
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Snackbars;
