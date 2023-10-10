import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  styled,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";

import { Link } from "react-router-dom";
import { SidebarItemDto } from "./Sidebar";

const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(14),
    borderRadius: 6,
    fontWeight: 600,
  },
}));

interface SidebarItemProps {
  item: SidebarItemDto;
  drawerOpen: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  drawerOpen,
}) => {
  return (
    <DarkTooltip
      title={item.title}
      placement="right"
      disableHoverListener={drawerOpen}
      key={item.title}
    >
      <Link to={item.to}>
        <ListItemButton>
          <ListItemIcon>
            <item.icon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              noWrap: true,
              style: {
                color: "white",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: drawerOpen ? "auto" : "120px",
                fontSize: 14,
              },
            }}
          />
        </ListItemButton>
      </Link>
    </DarkTooltip>
  );
};

export default SidebarItem;
