import React from "react";
import { Row, Table } from "react-bootstrap";
import styled from "styled-components";
import { P, H3Bold } from "../../components/Text";
import { THead } from "../../components/Table";

const Paper = styled(Row)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 16px;
`;

function UnPlannedExpenses() {
  return (
    <Paper className="mt-5">
      <Row>
        <H3Bold className="font-weight-bold">Unplanned Expenses</H3Bold>
      </Row>
      <Row>
        <Table bordered>
          <THead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </THead>
          <tbody>
            <tr>
              <td>
                <P>Overall</P>
              </td>
              <td>
                <P>100円</P>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Paper>
  );
}

export default UnPlannedExpenses;
