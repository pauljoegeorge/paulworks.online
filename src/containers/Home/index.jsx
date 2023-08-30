import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import avatar from "../../assets/pj-avatar.svg";
import { Avatar } from "./components/Avatar";
import { MovingNameWrapper, MovingName } from "./components/Name";
import { MovingText } from "./components/MovingText";
import { SocialMediaWrapper } from "./components/SocialMediaWrapper";
import { events, pushEvent } from "../../utils/gtm";
import { findSocialLink } from "./utils/helper";
import MoneyProphetLogo from "../../assets/moneyProphet.png";
// import moneyProphetLogo from "moneyProphet512.png";

const Wrapper = styled.div`
  text-align: center;
`;

function HomeContainer() {
  const handleSocialClick = (app) => {
    const socialUrl = findSocialLink(app);
    pushEvent({
      ...events.onClickSocial(app),
    });
    window.open(socialUrl, "_blank");
  };

  const handleRouteToApp = () => {
    window.location.href = "/dashboard";
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Avatar src={avatar} roundedCircle />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <MovingNameWrapper>
              <MovingName>Paul&nbsp;</MovingName>
              <MovingName>Joe&nbsp;</MovingName>
              <MovingName>George</MovingName>
            </MovingNameWrapper>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <MovingText>Hi there</MovingText>
            <MovingText>I use Ruby on Rails | ReactJS</MovingText>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <SocialMediaWrapper onClick={() => handleSocialClick("Github")}>
              <FaGithub size={30} />
            </SocialMediaWrapper>
            <SocialMediaWrapper onClick={() => handleSocialClick("Twitter")}>
              <FaTwitter size={30} />
            </SocialMediaWrapper>
            <SocialMediaWrapper onClick={() => handleSocialClick("Linkedin")}>
              <FaLinkedin size={30} />
            </SocialMediaWrapper>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <SocialMediaWrapper onClick={() => handleRouteToApp()}>
              <img
                width="75px"
                src={MoneyProphetLogo}
                alt="logo"
                href="/dashboard"
              />
            </SocialMediaWrapper>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

export default HomeContainer;

HomeContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
