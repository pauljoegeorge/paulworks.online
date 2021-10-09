import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '../../components/Link';

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 15px;
  width: 100%;
  height: 60px;
  text-align: center;
  font-size: 15px;
`;

const LayoutContainer = (props) => {
  const { children } = props;
  return (
    <>
      {children}
      <Footer>
        <Link onClick={() => window.open(`${process.env.PUBLIC_URL}/privacy.html`, '_blank')}>| Privacy Policy |</Link>
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
