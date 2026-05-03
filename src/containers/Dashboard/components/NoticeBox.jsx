import React, { useState } from "react";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { H1, PBold } from "../../../components/Text";
import { Flex, FlexChild } from "../../../components/Div";
import {
  getExpenseVisibility,
  setExpenseVisibility,
} from "../../../utils/utils";

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
    <Flex justify="space-evenly" gap="12px" style={{ padding: "8px 0" }}>
      {(data || []).map((item) => (
        <FlexChild
          key={item.key}
          direction="column"
          bg="var(--card)"
          align="center"
          width="100%"
          padding="20px 16px"
          style={{
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
            transition: "box-shadow 0.2s ease, background-color 0.2s ease",
            textAlign: "center",
          }}
        >
          <PBold mb="8px">{item?.head}</PBold>
          <H1 color="var(--foreground)" style={{ margin: "4px 0" }}>
            {visibilities[item?.key] ? item?.value : "— — —"}
          </H1>
          <button
            type="button"
            aria-label={
              visibilities[item?.key]
                ? `Hide ${item?.head}`
                : `Show ${item?.head}`
            }
            onClick={() => switchVisibility(item?.key)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted-foreground)",
              padding: "4px",
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {visibilities[item?.key] ? (
              <Visibility style={{ fontSize: "1.1rem" }} />
            ) : (
              <VisibilityOff style={{ fontSize: "1.1rem" }} />
            )}
          </button>
        </FlexChild>
      ))}
    </Flex>
  );
}

NoticeBox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      head: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NoticeBox;
