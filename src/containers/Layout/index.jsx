import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from './Navbar';
import { Link } from '../../components/Link';
import { pushEvent, events } from '../../utils/gtm';

const Footer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 15px;
  clear: both;
  position: absolute;
  bottom: 0;
  margin-bottom: -60px;
`;

const LayoutContainer = (props) => {
  const { children } = props;
  const handlePrivacy = () => {
    pushEvent({
      ...events.onClickPrivacy(),
    });
    return window.open(`${process.env.PUBLIC_URL}/privacy.html`, '_blank');
  };

  return (
    <>
      <Navbar {...children?.props} />
      {children}
      <Footer>
        <Link onClick={() => handlePrivacy()}>| Privacy Policy |</Link>
      </Footer>
    </>
  );
};

export default LayoutContainer;

LayoutContainer.propTypes = {
  match: PropTypes.shape({
    children: PropTypes.string,
  }).isRequired,
};
