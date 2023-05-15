import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

function Notify(props) {
  const { status, message, onClose } = props;

  return (
    <Alert key={status} variant={status} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

Notify.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notify;
