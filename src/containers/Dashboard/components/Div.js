import styled from "@emotion/styled";

export const MainWrapper = styled.div`
  width: 80vw;
  text-align: ${(props) => (props.align ? props.align : "unset")};
  @media (max-width: 767px) {
    width: 100%;
  }
`;
