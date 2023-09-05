import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { H1, PBold } from "../../../components/Text";
import { Flex, FlexChild } from "../../../components/Div";
import { colors } from "../../../utils/colors";

const Item = styled.div`
  margin: 50px;
  text-align: center;
`;

function NoticeBox(props) {
  const { data } = props;

  return (
    <Flex justify="space-evenly">
      {(data || []).map((item) => (
        <FlexChild
          direction="column"
          bg={colors.lavender}
          align="center"
          width="100%"
          margin="20px"
        >
          <Item>
            <PBold>{item?.head}</PBold>
            <H1 color={colors.primary}>{item?.value}</H1>
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
