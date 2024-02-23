import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { colors } from "../../../utils/colors";
import WiseIcon from "../../../assets/wise-icon.svg";

function NavDrawerSection(props) {
  const { open, sectionHead, sectionItems } = props;
  const theme = useTheme();

  return (
    <List>
      <p
        style={{
          opacity: open ? 1 : 0,
          marginLeft: `calc(${theme.spacing(3)} + 1px)`,
        }}
      >
        {sectionHead}
      </p>
      {sectionItems.map((item) => (
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
                  marginRight: open ? `calc(${theme.spacing(3)} + 1px)` : "0px",
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
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

NavDrawerSection.propTypes = {
  open: PropTypes.bool,
  sectionHead: PropTypes.string.isRequired,
  sectionItems: PropTypes.instanceOf(Array).isRequired,
};

NavDrawerSection.defaultProps = {
  open: false,
};

export default NavDrawerSection;
