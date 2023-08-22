import React, { useState } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";
import { mainListItems } from "./listItems";
import { isMobile } from "../../utils/utils";

const ChildWrapper = styled.div`
  min-height: 100vh;
`;

const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3e41a5",
    },
  },
});

function AppLayout(props) {
  const { children, window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handlePrivacy = () => {
    pushEvent({
      ...events.onClickPrivacy(),
    });
    return window.open(`${process.env.PUBLIC_URL}/privacy.html`, "_blank");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MoneyProphet
      </Typography>
      <Divider />
      <List>{mainListItems}</List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MoneyProphet
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {mainListItems}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ p: 3, width: "100%" }}
        >
          <ChildWrapper>{children}</ChildWrapper>
          <footer className="mt-5 py-3">
            <Container>
              <div className="text-center">
                <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
                <p>&copy; 2022 Paul Joe George. All rights reserved.</p>
              </div>
            </Container>
          </footer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

AppLayout.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  window: PropTypes.shape({
    open: PropTypes.func.isRequired,
  }).isRequired,
};

export default AppLayout;
