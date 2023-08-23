import styled from "styled-components";
import { Row } from "react-bootstrap";

export const THead = styled.thead`
  background-color: #f8f9fa;
  color: #2f3746;
  font-weight: 600;
  line-height: 1;
`;

export const CustomRow = styled(Row)`
  @media (max-width: 767px) {
    > [class*="col-"] {
      margin-bottom: 20px;
    }
  }
`;
