import styled from "styled-components";
import { Row } from "react-bootstrap";

export const THead = styled.thead`
  background-color: var(--muted);
  color: var(--muted-foreground);
  font-weight: 600;
  font-size: 0.6875rem;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  line-height: 1;
`;

export const CustomRow = styled(Row)`
  @media (max-width: 767px) {
    > [class*="col-"] {
      margin-bottom: 20px;
    }
  }
`;
