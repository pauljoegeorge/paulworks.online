import React from "react";
import PropTypes from "prop-types";
import { Row, Table } from "react-bootstrap";
import styled from "styled-components";
import { P, H3Bold } from "../../../components/Text";
import { THead } from "../../../components/Table";

const Paper = styled(Row)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 16px;
`;

function PlannedExpenses(props) {
  const { fixedExpenses } = props;

  return (
    <Paper className="mt-5">
      <Row>
        <H3Bold className="font-weight-bold">Planned Expenses</H3Bold>
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
            {(fixedExpenses || []).map((fixedExpense) => {
              return (
                <tr>
                  <td>
                    <P>{fixedExpense.name}</P>
                  </td>
                  <td>
                    <P>{fixedExpense.amount}</P>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Paper>
  );
}

PlannedExpenses.propTypes = {
  fixedExpenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PlannedExpenses;
