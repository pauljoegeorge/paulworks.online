import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  BalanceOutlined,
  ReceiptLong,
  PostAdd,
  PinDrop,
} from "@mui/icons-material";
import styled from "styled-components";
import WiseIcon from "../../assets/wise-icon.png";
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
    <StyledListItemButton style={{ color: "white" }} href="/map">
      <PinDrop />
      <ListItemText primary="Map" />
    </StyledListItemButton>
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
    <StyledListItemButton style={{ color: "white" }} href="/wise">
      <img src={WiseIcon} alt="Wise icon" height="20px" />
      <ListItemText primary="WISE" />
    </StyledListItemButton>
  </SwitchingDiv>
);
