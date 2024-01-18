import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { colors } from "../../../utils/colors";
import {
  Flex,
  FlexChild,
  BoxWithShadow,
  Divider,
} from "../../../components/Div";
import { P, PBold, PText } from "../../../components/Text";
import { formattedCurrency } from "../../../utils/currency";

const DateBox = styled.div`
  padding: 8px;
  background-color: ${colors.lightGrey};
  border-radius: 16px;
  max-width: fit-content;
`;

const FirstFlexChild = styled.div`
  padding-top: 3px;
  flex: 0 0 15%;
`;

const Item = styled.div`
  cursor: auto;
  &:hover {
    background-color: ${colors.lightGrey};
  }
`;

function ExpenseSummary(props) {
  const {
    filteredExpenseCategories,
    topTransactions,
    popularTransactions,
    isCurrentMonth,
  } = props;

  return (
    <Row className="mt-5">
      {isCurrentMonth && filteredExpenseCategories.length > 0 && (
        <Col>
          <BoxWithShadow>
            <Typography
              component="h1"
              variant="h6"
              color={colors.primary}
              gutterBottom
              align="left"
              fontSize="1.5rem"
              fontWeight="600"
            >
              This Week
            </Typography>
            {(filteredExpenseCategories || []).map((category) => (
              <Item>
                <Flex justify="space-between">
                  <FlexChild>
                    <PBold tt="capitalize" size="1rem">
                      {category.name}
                    </PBold>
                  </FlexChild>
                  <FlexChild>
                    <PText bg={colors.lightOrange} padding="8px">
                      {formattedCurrency(category.total_expense_of_week)}
                    </PText>
                  </FlexChild>
                </Flex>
                <Divider />
              </Item>
            ))}
          </BoxWithShadow>
        </Col>
      )}
      {topTransactions.length > 0 && (
        <Col>
          <BoxWithShadow>
            <Typography
              component="h1"
              variant="h6"
              color={colors.primary}
              gutterBottom
              align="left"
              fontSize="1.5rem"
              fontWeight="600"
            >
              Peak Transactions 🤑
            </Typography>
            {(topTransactions || []).map((transaction) => {
              const dateObject = new Date(transaction.transaction_date);
              const monthOfTransaction = dateObject.toLocaleString("default", {
                month: "short",
              });
              const dayOfTransaction = `0${dateObject.getDate()}`.slice(-2);
              return (
                <Item>
                  <Flex>
                    <FirstFlexChild>
                      <DateBox>
                        <P height="0" padding="5px 0px" tt="uppercase">
                          {monthOfTransaction}
                        </P>
                        <PBold height="0" size="16px">
                          {dayOfTransaction}
                        </PBold>
                      </DateBox>
                    </FirstFlexChild>
                    <Flex justify="space-between">
                      <FlexChild>
                        <PBold
                          tt="capitalize"
                          size="1rem"
                          mb="0px"
                          align="left"
                        >
                          {transaction.category_name}
                        </PBold>
                        <P align="left">{transaction.notes || ""}</P>
                      </FlexChild>
                      <FlexChild>
                        <PText bg={colors.lightOrange} padding="10px" br="10px">
                          {formattedCurrency(transaction.amount)}
                        </PText>
                      </FlexChild>
                    </Flex>
                  </Flex>
                  <Divider />
                </Item>
              );
            })}
          </BoxWithShadow>
        </Col>
      )}
      {Object.keys(popularTransactions).length > 0 && (
        <Col>
          <BoxWithShadow>
            <Typography
              component="h1"
              variant="h6"
              color={colors.primary}
              gutterBottom
              align="left"
              fontSize="1.5rem"
              fontWeight="600"
            >
              Popular Transactions 🔥
            </Typography>
            {Object.entries(popularTransactions || []).map(
              ([notes, transaction]) => (
                <Item>
                  <Flex justify="space-between">
                    <FlexChild>
                      <PBold tt="capitalize" size="1rem">
                        {`${notes}(${transaction.count})`}
                      </PBold>
                    </FlexChild>
                    <FlexChild>
                      <PText bg={colors.lightOrange} padding="10px" br="10px">
                        {formattedCurrency(transaction.total_spent)}
                      </PText>
                    </FlexChild>
                  </Flex>
                  <Divider />
                </Item>
              )
            )}
          </BoxWithShadow>
        </Col>
      )}
    </Row>
  );
}

ExpenseSummary.propTypes = {
  isCurrentMonth: PropTypes.bool.isRequired,
  filteredExpenseCategories: PropTypes.instanceOf(Array).isRequired,
  topTransactions: PropTypes.instanceOf(Array).isRequired,
  popularTransactions: PropTypes.instanceOf(Array).isRequired,
};

export default ExpenseSummary;
