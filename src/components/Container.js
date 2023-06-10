import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
`;
