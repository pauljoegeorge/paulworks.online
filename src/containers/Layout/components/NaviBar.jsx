import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import { AppBar } from "../utils/drawer";
import { FlexContainer } from "../../../components/Div";
import { colors } from "../../../utils/colors";
import ProfileMenu from "./ProfileMenu";
import NavDrawer from "./NavDrawer";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.primary,
    },
    text: {
      primary: colors.purpleGrey,
    },
  },
});

function NavigationBar() {
  const [open, setOpen] = useState(false);
  const isMapPage = window.location.pathname.includes("/map") && !open;

  const handleDrawer = (state) => {
    setOpen(state);
  };

  const navigateToChat = () => {
    window.location.href = "/chat";
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            paddingRight: "8px",
          }}
        >
          <FlexContainer justify="flex-start">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleDrawer(true)}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              MoneyProphet
            </Typography>
          </FlexContainer>
          <IconButton size="large" onClick={navigateToChat}>
            <AutoAwesome
              sx={{
                color: colors.white,
                fontSize: "2rem",
              }}
            />
          </IconButton>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      {!isMapPage && <NavDrawer open={open} handleDrawer={handleDrawer} />}
    </ThemeProvider>
  );
}

export default NavigationBar;
