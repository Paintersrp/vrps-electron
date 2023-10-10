import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  Divider,
  Toolbar,
  IconButton,
  CssBaseline,
  Box,
  alpha,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

import SidebarItem from "./SidebarItem";

export interface SidebarItemDto {
  title: string;
  to: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItemDto[] = [
  {
    title: "Batch ID Duplicator",
    to: "/",
    icon: BatchPredictionIcon,
  },
  {
    title: "Barcode Generator",
    to: "/barcode",
    icon: QrCode2Icon,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<LayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showDwells, setShowDwells] = useState(false);
  const theme = useTheme();
  const drawerWidth = drawerOpen ? 240 : 64;

  const drawerTransition = theme.transitions.create(
    ["width", "background-color"],
    {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }
  );

  const contentTransition = theme.transitions.create("margin-left", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "F") {
        setShowDwells((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Box display="flex" height="100vh">
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{
          style: {
            width: drawerWidth,
            transition: drawerTransition,
            zIndex: 1,
            overflowX: "hidden",
            boxShadow: theme.shadows[5],
            borderRight: "none",
          },
        }}
        sx={{
          "& .MuiListItemButton-root:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
          },
          "& a": {
            textDecoration: "none",
            color: "inherit",
          },
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ color: "white" }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
        <List sx={{ py: 0 }}>
          {sidebarItems.map((item) => (
            <SidebarItem item={item} drawerOpen={drawerOpen} />
          ))}
          {showDwells && (
            <SidebarItem
              item={{ title: "Dwells", to: "/dwells", icon: HourglassTopIcon }}
              drawerOpen={drawerOpen}
            />
          )}
        </List>
      </Drawer>

      <Box
        component="main"
        flexGrow={1}
        py={2}
        px={3}
        style={{ marginLeft: drawerWidth, transition: contentTransition }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
