import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";
import { DrawerHeader } from "./utils/drawer";
import NavigationBar from "./components/NaviBar";
import { useThemeMode } from "../../contexts/ThemeContext";

const ChildWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  flex: 1 0 auto;
  padding: 8px 24px 24px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 8px 12px 16px;
  }
`;

function AppLayout(props) {
  const { children, window } = props;
  const { mode } = useThemeMode();
  const muiTheme = createTheme({ palette: { mode } });

  const handlePrivacy = () => {
    pushEvent({
      ...events.onClickPrivacy(),
    });
    return window.open(`${import.meta.env.BASE_URL}/privacy.html`, "_blank");
  };

  return (
    <ThemeProvider theme={muiTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavigationBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--background)",
          transition: "background-color 0.2s ease",
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            width: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ToastContainer
            toastStyle={{
              borderRadius: "8px",
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "14px",
            }}
          />
          <ChildWrapper style={{ flex: 1, width: "100%" }}>
            {children}
          </ChildWrapper>
          <footer
            className="mt-5 py-3"
            style={{
              width: "100%",
              borderTop: "1px solid var(--border)",
              backgroundColor: "var(--background)",
              transition: "background-color 0.2s ease",
            }}
          >
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center">
                <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
                <p>&copy; 2022 Paul Joe George. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Box>
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
