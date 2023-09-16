import React from "react";
import PropTypes from "prop-types";
import { Row, Table } from "react-bootstrap";
import styled from "styled-components";
import { H3Bold } from "./Text";
import { THead } from "./Table";

const Paper = styled(Row)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 16px;
`;

function TableLayout(props) {
  const { title, heads, children } = props;

  return (
    <Paper className="mt-5">
      <Row>
        <H3Bold className="font-weight-bold">{title}</H3Bold>
      </Row>
      <Row>
        <Table bordered>
          <THead>
            <tr>
              {(heads || []).map((head) => (
                <th>{head}</th>
              ))}
            </tr>
          </THead>
          <tbody>{children}</tbody>
        </Table>
      </Row>
    </Paper>
  );
}

TableLayout.propTypes = {
  title: PropTypes.string.isRequired,
  heads: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableLayout;
