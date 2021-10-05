import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import avatar from '../../assets/pj-avatar.svg';
import { GithubUrl, LinkedinUrl, TwitterUrl } from './constants/constants';
import { Avatar } from './components/Avatar';
import { MovingNameWrapper, MovingName } from './components/Name';
import { MovingText } from './components/MovingText';
import { SocialMediaWrapper } from './components/SocialMediaWrapper';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 80px;
`;

const HomeContainer = () => (
  <Wrapper>
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Avatar src={avatar} roundedCircle />
        </Col>
      </Row>
      <Row>
        <Col
          md={{
            span: 6,
            offset: 3,
          }}
        >
          <MovingNameWrapper>
            <MovingName>Paul</MovingName>
            <MovingName>Joe</MovingName>
            <MovingName>George</MovingName>
          </MovingNameWrapper>
        </Col>
      </Row>
      <Row>
        <Col
          md={{
            span: 6,
            offset: 3,
          }}
        >
          <MovingText>Hi there</MovingText>
          <MovingText>I use Ruby on Rails | ReactJS</MovingText>
        </Col>
      </Row>
      <Row>
        <Col
          md={{
            span: 6,
            offset: 3,
          }}
        >
          <SocialMediaWrapper onClick={() => window.open(GithubUrl, '_blank')}>
            <FaGithub size={30} />
          </SocialMediaWrapper>
          <SocialMediaWrapper onClick={() => window.open(TwitterUrl, '_blank')}>
            <FaTwitter size={30} />
          </SocialMediaWrapper>
          <SocialMediaWrapper
            onClick={() => window.open(LinkedinUrl, '_blank')}
          >
            <FaLinkedin size={30} />
          </SocialMediaWrapper>
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

export default HomeContainer;

HomeContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
