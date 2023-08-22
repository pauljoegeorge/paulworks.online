import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Report,
  BalanceOutlined,
  ReceiptLong,
  PostAdd,
} from "@mui/icons-material";
import { SwitchingDiv } from "../../components/Div";

export const mainListItems = (
  <SwitchingDiv>
    <ListItemButton href="/dashboard">
      <DashboardIcon style={{ color: "white" }} />
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    {/* <Divider sx={{ my: 1, mt: 3 }} />
    <ListSubheader component="div" inset sx={{ background: "transparent" }}>
      Settings
    </ListSubheader> */}
    {/* <ListItemButton href="/income">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Income" />
    </ListItemButton>
    <ListItemButton href="/fixed_expenses">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Planned Expenses" />
    </ListItemButton>
    <ListItemButton href="/unexpected_expenses">
      <ListItemIcon>
        <Report />
      </ListItemIcon>
      <ListItemText primary="Unplanned Expenses" />
    </ListItemButton> */}
    <ListItemButton href="/new">
      <PostAdd style={{ color: "white" }} />
      <ListItemText primary="New" />
    </ListItemButton>
    <ListItemButton href="/budget">
      <BalanceOutlined style={{ color: "white" }} />
      <ListItemText primary="Budget" />
    </ListItemButton>
    <ListItemButton href="/expenses">
      <ReceiptLong style={{ color: "white" }} />
      <ListItemText primary="Expenses" />
    </ListItemButton>
  </SwitchingDiv>
);
