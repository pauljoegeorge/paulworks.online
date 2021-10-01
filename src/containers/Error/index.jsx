import React from 'react';
import PropTypes from 'prop-types';

const ErrorContainer = ({ match }) => (
  <>
    <h1>#Error</h1>
    <h2>
      Path:
      {match?.path}
    </h2>
  </>
);

export default ErrorContainer;

ErrorContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
