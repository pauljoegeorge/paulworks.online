import styled from "styled-components";
import { Button } from "react-bootstrap";

export const PrimaryButton = styled(Button)`
  background-color: #3e41a5 !important;
  transition: opacity 0.3s;
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
`;
