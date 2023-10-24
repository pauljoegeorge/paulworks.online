import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import avatar from "../../assets/pj-avatar.svg";
import { Avatar } from "./components/Avatar";
import { SocialMediaWrapper } from "./components/SocialMediaWrapper";
import { events, pushEvent } from "../../utils/gtm";
import { findSocialLink } from "./utils/helper";
import MoneyProphetLogo from "../../assets/moneyProphet.png";
import { CentralDiv, Flex, SwitchingDiv } from "../../components/Div";
import { H1Span, H3Span } from "../../components/Text";
import { colors } from "../../utils/colors";
import HomeNavbar from "./HomeNavbar";
import { designation, summary, skills } from "./utils/personalInfo";
import { isMobile } from "../../utils/utils";

const Wrapper = styled.div`
  text-align: center;
  color: #0c1021;
  background: #0c1021;
`;
const Heading = styled.p`
  font-size: 3rem;
  letter-spacing: 3px;
  text-align: center;
  color: #fff;
  font-weight: 700;
`;

const gradientText = keyframes`
  0% {
      background-position: 0% 50%;
  }
  100% {
      background-position: 100% 50%;
  }
`;

const SubHeading = styled.p`
  font-size: 2rem;
  letter-spacing: 3px;
  text-align: center;
  color: #fff;
  font-weight: 200;
  text-transform: uppercase;
  font-family: courier, monospace;
  background: linear-gradient(
    to right,
    #7953cd 20%,
    #00affa 30%,
    #0190cd 70%,
    #764ada 80%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  background-size: 500% auto;
  animation: ${gradientText} 5s ease-in-out infinite;
`;

const Summary = styled.p`
  font-size: 1rem;
  letter-spacing: 3px;
  text-align: center;
  color: #fff;
  font-weight: 200;
`;

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

const Emoji = styled.span`
  font-size: 2rem;
  display: inline-block;
  animation: ${wave} 3s ease-in-out infinite;
`;

function HomeContainer() {
  const mobileView = isMobile();
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
      <HomeNavbar />
      <CentralDiv mt="6rem">
        <Row className="justify-content-center mt-4">
          <Col>
            <Heading>
              Hi There!&nbsp;
              <Emoji role="img" aria-label="Wave Emoji" aria-hidden="false">
                👋
              </Emoji>
            </Heading>
            <Heading>
              I&rsquo;m <H1Span color={colors.blue}>Paul Joe George </H1Span>
            </Heading>
            <Row className="justify-content-center mb-2">
              <Col>
                <Avatar src={avatar} roundedCircle />
              </Col>
            </Row>
            <Flex align={mobileView ? "center" : "baseline"}>
              <SubHeading>{designation}&nbsp;</SubHeading>
              <span style={{ fontSize: "2rem" }}>👨🏻‍💻</span>
            </Flex>
            <Summary>{summary}</Summary>
          </Col>
        </Row>
        <SwitchingDiv>
          {skills.map((skill) => (
            <H3Span color={colors.blue}>{skill}</H3Span>
          ))}
        </SwitchingDiv>
        <Row className="justify-content-center mt-4">
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
        <Row className="justify-content-center mt-4 mb-4">
          <Col>
            <div style={{ color: "white" }}>
              <SocialMediaWrapper onClick={() => handleRouteToApp()}>
                <img
                  width="75px"
                  src={MoneyProphetLogo}
                  alt="logo"
                  href="/dashboard"
                />
              </SocialMediaWrapper>
            </div>
          </Col>
        </Row>
      </CentralDiv>
    </Wrapper>
  );
}

export default HomeContainer;

HomeContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
