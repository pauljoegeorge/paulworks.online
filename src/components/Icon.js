import styled from "styled-components";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { colors } from "../utils/colors";

export const LeftArrow = styled(NavigateBefore)`
  color: ${colors.purpleGrey};
  cursor: pointer;
  margin-right: 14px;
  background: ${colors.grey};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const RightArrow = styled(NavigateNext)`
  color: ${colors.purpleGrey};
  cursor: pointer;
  margin-left: 14px;
  background: ${colors.grey};
`;
