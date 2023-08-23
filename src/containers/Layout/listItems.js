import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Report,
  BalanceOutlined,
  ReceiptLong,
  PostAdd,
} from "@mui/icons-material";
import styled from "styled-components";
import { SwitchingDiv } from "../../components/Div";

const StyledListItemButton = styled(ListItemButton)`
   {
    transition: opacity 0.5s;
    &:hover,
    &:active {
      opacity: 0.6;
    }
  }
`;

export const mainListItems = (
  <SwitchingDiv>
    <StyledListItemButton style={{ color: "white" }} href="/dashboard">
      <DashboardIcon />
      <ListItemText primary="Dashboard" />
    </StyledListItemButton>
    <StyledListItemButton style={{ color: "white" }} href="/new">
      <PostAdd />
      <ListItemText primary="New" />
    </StyledListItemButton>
    <StyledListItemButton style={{ color: "white" }} href="/budget">
      <BalanceOutlined />
      <ListItemText primary="Budget" />
    </StyledListItemButton>
    <StyledListItemButton style={{ color: "white" }} href="/expenses">
      <ReceiptLong />
      <ListItemText primary="Expenses" />
    </StyledListItemButton>
  </SwitchingDiv>
);
