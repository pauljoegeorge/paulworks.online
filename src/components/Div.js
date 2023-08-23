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

export const Flex = styled.div`
  display: flex;
  background: ${(props) => (props.bg ? props.bg : "none")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  height: ${(props) => (props.height ? props.height : "auto")};
  flex: 1;
`;

export const FlexChild = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.bg ? props.bg : "none")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  padding: 10px;
`;
