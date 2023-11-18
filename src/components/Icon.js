import styled from "styled-components";
import {
  NavigateNext,
  NavigateBefore,
  Download,
  Toc,
  Edit,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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

export const PlusIcon = styled(AddIcon)`
  color: ${colors.purpleGrey};
  cursor: pointer;
  margin-left: 14px;
  min-width: 50px;
`;

export const DownloadIcon = styled(Download)`
  color: ${colors.purpleGrey};
  cursor: pointer;
  margin-left: 14px;
  background: ${colors.grey};
`;

export const TableViewMode = styled(Toc)`
  color: ${colors.purpleGrey};
  cursor: pointer;
  margin-left: 14px;
  background: ${colors.grey};
`;

export const EditMode = styled(Edit)`
  color: ${colors.purpleGrey};
  cursor: pointer;
  margin-left: 14px;
  padding: 2px 0px;
  background: ${colors.grey};
`;
