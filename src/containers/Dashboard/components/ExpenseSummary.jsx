import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { colors } from "../../../utils/colors";
import { Flex, FlexChild, BoxWithShadow, Divider } from "../../../components/Div";
import { P, PBold, PText } from "../../../components/Text";
import { formattedCurrency } from "../../../utils/currency";

const DateBox = styled.div`
  padding: 6px 10px;
  background-color: var(--muted);
  border-radius: var(--radius-md);
  max-width: fit-content;
`;

const FirstFlexChild = styled.div`
  padding-top: 3px;
  flex: 0 0 15%;
`;

const Item = styled.div`
  cursor: auto;
  border-radius: var(--radius-sm);
  transition: background-color 0.15s ease;
  &:hover { background-color: var(--muted); }
`;

function ExpenseSummary({ filteredExpenseCategories, topTransactions, popularTransactions, isCurrentMonth }) {
  return (
    <div className="flex flex-wrap gap-5 mt-12">
      {isCurrentMonth && filteredExpenseCategories.length > 0 && (
        <div className="flex-1 min-w-[280px]">
          <BoxWithShadow>
            <Typography component="h1" variant="h6" style={{ color: "var(--primary)" }} gutterBottom align="left" fontSize="1.5rem" fontWeight="600">
              This Week 📈
            </Typography>
            {(filteredExpenseCategories || []).map((category) => (
              <Item key={category.name}>
                <Flex justify="space-between">
                  <FlexChild><PBold tt="capitalize" size="1rem">{category.name}</PBold></FlexChild>
                  <FlexChild><PText bg={colors.lightOrange} padding="8px" br="10px">{formattedCurrency(category.total_expense_of_week)}</PText></FlexChild>
                </Flex>
                <Divider />
              </Item>
            ))}
          </BoxWithShadow>
        </div>
      )}
      {topTransactions.length > 0 && (
        <div className="flex-1 min-w-[280px]">
          <BoxWithShadow>
            <Typography component="h1" variant="h6" style={{ color: "var(--primary)" }} gutterBottom align="left" fontSize="1.5rem" fontWeight="600">
              Peak Transactions 🤑
            </Typography>
            {(topTransactions || []).map((transaction) => {
              const dateObject = new Date(transaction.transaction_date);
              const monthOfTransaction = dateObject.toLocaleString("default", { month: "short" });
              const dayOfTransaction = `0${dateObject.getDate()}`.slice(-2);
              return (
                <Item key={transaction.transaction_date}>
                  <Flex>
                    <FirstFlexChild>
                      <DateBox>
                        <P height="0" padding="5px 0px" tt="uppercase">{monthOfTransaction}</P>
                        <PBold height="0" size="16px">{dayOfTransaction}</PBold>
                      </DateBox>
                    </FirstFlexChild>
                    <Flex justify="space-between">
                      <FlexChild>
                        <PBold tt="capitalize" size="1rem" mb="0px" align="left">{transaction.category_name}</PBold>
                        <P align="left" wordBreak="break-all">{transaction.notes || ""}</P>
                      </FlexChild>
                      <FlexChild>
                        <PText bg={colors.lightOrange} padding="10px" br="10px">{formattedCurrency(transaction.amount)}</PText>
                      </FlexChild>
                    </Flex>
                  </Flex>
                  <Divider />
                </Item>
              );
            })}
          </BoxWithShadow>
        </div>
      )}
      {Object.keys(popularTransactions).length > 0 && (
        <div className="flex-1 min-w-[280px]">
          <BoxWithShadow>
            <Typography component="h1" variant="h6" style={{ color: "var(--primary)" }} gutterBottom align="left" fontSize="1.5rem" fontWeight="600">
              Popular Transactions 🔥
            </Typography>
            {Object.entries(popularTransactions || []).map(([notes, transaction]) => (
              <Item key={notes}>
                <Flex justify="space-between">
                  <FlexChild>
                    <PBold tt="capitalize" size="1rem" wordBreak="break-all" align="left">{`${notes}(${transaction.count})`}</PBold>
                  </FlexChild>
                  <FlexChild>
                    <PText bg={colors.lightOrange} padding="10px" br="10px">{formattedCurrency(transaction.total_spent)}</PText>
                  </FlexChild>
                </Flex>
                <Divider />
              </Item>
            ))}
          </BoxWithShadow>
        </div>
      )}
    </div>
  );
}

ExpenseSummary.propTypes = {
  isCurrentMonth: PropTypes.bool.isRequired,
  filteredExpenseCategories: PropTypes.instanceOf(Array).isRequired,
  topTransactions: PropTypes.instanceOf(Array).isRequired,
  popularTransactions: PropTypes.instanceOf(Array).isRequired,
};

export default ExpenseSummary;
