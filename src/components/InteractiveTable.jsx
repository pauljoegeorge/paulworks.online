import React from "react";
import PropTypes from "prop-types";
import { Row, Table } from "react-bootstrap";
import styled from "styled-components";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { H3Bold } from "./Text";
import { THead } from "./Table";
import { FlexContainer } from "./Container";

function InteractiveTable(props) {
  const { title, heads, children, handleClick, sortParams } = props;
  const activeSortParam = sortParams.find((s) => s.active);

  return (
    <FlexContainer width="90vw" className="mt-5">
      {title && (
        <Row>
          <H3Bold className="font-weight-bold">{title}</H3Bold>
        </Row>
      )}
      <Row className="w-100">
        <Table bordered striped responsive>
          <THead>
            <tr>
              {(heads || []).map((head) => {
                const key = Object.keys(head)[0];
                const value = Object.values(head)[0];
                let icon = null;
                if (activeSortParam.field === value) {
                  icon =
                    activeSortParam.order === "asc" ? (
                      <ArrowDropDown />
                    ) : (
                      <ArrowDropUp />
                    );
                }
                return (
                  <th
                    key={key}
                    onClick={() => handleClick(value)}
                    style={{ cursor: "pointer" }}
                  >
                    {key}
                    {icon}
                  </th>
                );
              })}
            </tr>
          </THead>
          <tbody>{children}</tbody>
        </Table>
      </Row>
    </FlexContainer>
  );
}

InteractiveTable.propTypes = {
  handleClick: PropTypes.func.isRequired,
  sortParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  heads: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InteractiveTable;
