import React from 'react';
import PropTypes from 'prop-types';

const HomeContainer = ({ match }) => (
  <>
    <h1>#Home</h1>
    <h2>
      Path:
      {match?.path}
    </h2>
  </>
);

export default HomeContainer;

HomeContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
