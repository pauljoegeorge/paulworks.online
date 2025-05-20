import styled from "styled-components";
import { Container } from "react-bootstrap";

export const CentralDiv = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // min-height: 100vh;
  margin-top: ${(props) => (props.mt ? props.mt : "50px")};
  width: 100%;
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
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  width: ${(props) => (props.width ? props.width : "auto")};
  flex: 1;

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  background: ${(props) => (props.bg ? props.bg : "none")};
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  height: ${(props) => (props.height ? props.height : "auto")};
  gap: ${(props) => (props.gap ? props.gap : "0px")};
  flex: 1;
`;

export const FlexChild = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.bg ? props.bg : "none")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  padding: ${(props) => (props.padding ? props.padding : "10px")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  box-shadow: ${(props) => (props.shadow ? props.shadow : "none")};
`;

export const Divider = styled.hr`
  border: none;
  height: 2px;
  background-color: #000;
  margin: 2px 0;
`;

export const BoxWithShadow = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: ${(props) => (props.padding ? props.padding : "20px")};
  text-align: center;
  height: auto;
`;
