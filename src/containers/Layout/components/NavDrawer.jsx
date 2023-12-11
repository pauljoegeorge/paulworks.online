import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  BalanceOutlined,
  ReceiptLong,
  PostAdd,
  PinDrop,
} from "@mui/icons-material";
import { DrawerHeader, Drawer } from "../utils/drawer";
import { colors } from "../../../utils/colors";
import WiseIcon from "../../../assets/wise-icon.svg";

function NavDrawer(props) {
  const { open, handleDrawer } = props;
  const theme = useTheme();
  const overViewItems = [
    { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
    { name: "Expenses", icon: ReceiptLong, href: "/expenses" },
    { name: "Map", icon: PinDrop, href: "/map" },
  ];
  const managementItems = [
    { name: "New", icon: PostAdd, href: "/new" },
    { name: "Budget", icon: BalanceOutlined, href: "/budget" },
    { name: "WISE", icon: WiseIcon, href: "/wise" },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => handleDrawer(false)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        <p
          style={{
            opacity: open ? 1 : 0,
            marginLeft: `calc(${theme.spacing(3)} + 1px)`,
          }}
        >
          OVERVIEW
        </p>
        {overViewItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: colors.lavender,
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              href={item.href}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <p
          style={{
            opacity: open ? 1 : 0,
            marginLeft: `calc(${theme.spacing(3)} + 1px)`,
          }}
        >
          MANAGEMENT
        </p>
        {managementItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              display: "block",
              "&:hover": {
                backgroundColor: colors.lavender,
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              href={item.href}
            >
              {item.name === "WISE" ? (
                <img
                  src={WiseIcon}
                  alt="Wise icon"
                  height="20px"
                  style={{
                    marginRight: open
                      ? `calc(${theme.spacing(3)} + 1px)`
                      : "0px",
                    justifyContent: "center",
                  }}
                />
              ) : (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

NavDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawer: PropTypes.func.isRequired,
};

NavDrawer.defaultProps = {
  open: false,
};

export default NavDrawer;
