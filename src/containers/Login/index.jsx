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
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const LoginWrapper = styled(Col)`
  border-radius: 20px;
  box-shadow: 0px 0px 10px 2px #00000040;
  background: #f8f8f8;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const AnimatedWavingHand = styled(InsertEmoticonSharp)`
  animation: ${wave} 2s infinite;
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
    <CentralDiv className="justify-content-center text-center">
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
