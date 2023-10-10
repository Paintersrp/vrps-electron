import React from "react";
import { Fab, useScrollTrigger, Zoom } from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const ScrollToTopFab: React.FC = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        size="small"
        color="secondary"
        onClick={handleScrollTop}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <ArrowUpwardIcon fontSize="small" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopFab;
