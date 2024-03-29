import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { H1, PBold } from "../../../components/Text";
import { Flex, FlexChild } from "../../../components/Div";
import { colors } from "../../../utils/colors";
import {
  getExpenseVisibility,
  setExpenseVisibility,
} from "../../../utils/utils";

const Item = styled.div`
  text-align: center;
`;

function NoticeBox(props) {
  const { data } = props;
  const [visibilities, setVisibilities] = useState(getExpenseVisibility());

  const switchVisibility = (key) => {
    const newVisibilities = { ...visibilities };
    newVisibilities[key] = !newVisibilities[key];
    setExpenseVisibility(newVisibilities);
    setVisibilities(newVisibilities);
  };

  return (
    <Flex justify="space-evenly" gap="15px">
      {(data || []).map((item) => (
        <FlexChild
          direction="column"
          bg={colors.lavender}
          align="center"
          width="100%"
          padding="50px 0px"
          shadow="0 1px 2px rgba(128, 128, 144, 0.2), 0 2px 4px rgba(128, 128, 144, 0.3)"
        >
          <Item>
            <PBold>{item?.head}</PBold>
            <H1 color={colors.primary}>
              {visibilities[item?.key] ? item?.value : "￥ - - - - -"}
            </H1>
            {visibilities[item?.key] ? (
              <Visibility
                style={{ color: colors.primary }}
                onClick={() => switchVisibility(item?.key)}
              />
            ) : (
              <VisibilityOff
                style={{ color: colors.primary, cursor: "pointer" }}
                onClick={() => switchVisibility(item?.key)}
              />
            )}
          </Item>
        </FlexChild>
      ))}
    </Flex>
  );
}

NoticeBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NoticeBox;
