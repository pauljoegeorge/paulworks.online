import React from 'react';
import PropTypes from 'prop-types';

const SettingContainer = ({ match }) => (
  <>
    <h1>#Setting</h1>
    <h2>
      Path:
      {match.path}
    </h2>
  </>
);

export default SettingContainer;

SettingContainer.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
