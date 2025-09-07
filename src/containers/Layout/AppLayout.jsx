import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "../../components/Link";
import { pushEvent, events } from "../../utils/gtm";
import { DrawerHeader } from "./utils/drawer";
import NavigationBar from "./components/NaviBar";

const ChildWrapper = styled.div`
  // min-height: 100vh;
  width: 100%;
  max-width: 85%;
  flex: 1 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

function AppLayout(props) {
  const { children, window } = props;

  const handlePrivacy = () => {
    pushEvent({
      ...events.onClickPrivacy(),
    });
    return window.open(`${process.env.PUBLIC_URL}/privacy.html`, "_blank");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavigationBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "80%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: "100%", flex: 1 }}
        >
          <ToastContainer />
          <ChildWrapper style={{ flex: 1, width: "100%" }}>
            {children}
          </ChildWrapper>
          <footer className="mt-5 py-3" style={{ width: "100%" }}>
            <Container>
              <div className="text-center">
                <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
                <p>&copy; 2022 Paul Joe George. All rights reserved.</p>
              </div>
            </Container>
          </footer>
        </Box>
      </Box>
    </Box>
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
