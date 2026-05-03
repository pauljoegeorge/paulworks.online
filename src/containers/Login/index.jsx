import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { InsertEmoticonSharp } from "@mui/icons-material";
import GoogleAuth from "./GoogleAuth";
import { CentralDiv } from "../../components/Div";
import { H2Purple } from "../../components/Text";
import { useOAuth } from "./hooks/useOAuth";

const wave = keyframes`
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(20deg); }
  75%  { transform: rotate(-20deg); }
  100% { transform: rotate(0deg); }
`;

const LoginWrapper = styled(Col)`
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  background: var(--card);
  border: 1px solid var(--border);
  padding: 48px 40px !important;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const AnimatedWavingHand = styled(InsertEmoticonSharp)`
  animation: ${wave} 2s infinite;
  color: var(--primary);
  font-size: 3rem !important;
  margin-bottom: 16px;
`;

function LoginContainer(props) {
  const { history } = props;
  const { isLoading, oauthUrl, userToken, actions } = useOAuth();

  const resetUrl = () => {
    history.replace({ search: new URLSearchParams().toString() });
  };

  useEffect(() => {
    if (userToken) {
      history.replace("/dashboard");
    } else {
      actions.getOAuthUrl();
    }
  }, [userToken]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("state") === "google") {
      const code = decodeURIComponent(query.get("code"));
      if (code) {
        actions.startOAuth(code);
        resetUrl();
      }
    }
  }, [window.location]);

  return (
    <CentralDiv
      className="justify-content-center text-center"
      style={{
        minHeight: "100vh",
        background: "var(--background)",
      }}
    >
      <Container>
        <Row>
          <LoginWrapper className="py-5" xs={12} md={{ span: 6, offset: 3 }}>
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <AnimatedWavingHand />
                <H2Purple>Hola!</H2Purple>
                <GoogleAuth oauthUrl={oauthUrl} />
              </>
            )}
          </LoginWrapper>
        </Row>
      </Container>
    </CentralDiv>
  );
}

LoginContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoginContainer;
