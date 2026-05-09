import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GoogleLogo from "../../assets/google.png";

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card);
  color: var(--foreground);
  font-family: var(--font-body), sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: var(--muted);
    border-color: var(--primary);
    transform: translateY(-1px);
  }
`;

function GoogleAuth(props) {
  const { oauthUrl } = props;

  const handleOAuth = () => {
    window.open(oauthUrl, "_self");
  };

  return (
    <GoogleButton type="button" onClick={handleOAuth}>
      <img src={GoogleLogo} alt="google" style={{ width: "20px", height: "20px" }} />
      Continue with Google
    </GoogleButton>
  );
}

GoogleAuth.propTypes = {
  oauthUrl: PropTypes.string.isRequired,
};

export default GoogleAuth;
