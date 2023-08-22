import styled from "styled-components";
import { Container } from "react-bootstrap";

export const CentralDiv = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 50px;
`;

export const SwitchingDiv = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
