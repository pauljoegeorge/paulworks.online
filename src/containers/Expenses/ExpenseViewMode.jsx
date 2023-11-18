import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FlexContainer } from "../../components/Container";
import InteractiveTable from "../../components/InteractiveTable";
import { formattedCurrency } from "../../utils/currency";
import { P, PBold } from "../../components/Text";
import { setExpenseSortParams } from "./utils/utils";
import WiseLogo from "../../assets/wise-logo.png";

function ExpensesViewMode(props) {
  const { expenses, handleSortExpenses, sortParams, setSortParams } = props;

  useEffect(() => {
    const sortParam = sortParams.find((s) => s.active);
    handleSortExpenses(sortParam.field, sortParam.order);
  }, [sortParams]);

  const handleCategoryClick = (category) => {
    const updatedParams = setExpenseSortParams(sortParams, category);
    setSortParams(updatedParams);
  };

  return (
    <FlexContainer width="90vw">
      <InteractiveTable
        heads={[
          { Category: "fixed_expense_category_id" },
          { Amount: "amount" },
          { Notes: "notes" },
          { Date: "transaction_date" },
        ]}
        handleClick={handleCategoryClick}
        sortParams={sortParams}
      >
        {(expenses || []).map((expense) => (
          <tr>
            <td>
              <PBold tt="none">
                {expense.category_name}
                {expense.transaction_source === "wise" && (
                  <img src={WiseLogo} alt="wise logo" height="20px" />
                )}
              </PBold>
            </td>
            <td>
              <P>{formattedCurrency(expense.amount)}</P>
            </td>
            <td>
              <P tt="none">{expense.notes}</P>
            </td>
            <td>
              <P>{expense.transaction_date}</P>
            </td>
          </tr>
        ))}
      </InteractiveTable>
    </FlexContainer>
  );
}

ExpensesViewMode.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSortExpenses: PropTypes.func.isRequired,
  sortParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSortParams: PropTypes.func.isRequired,
};

export default ExpensesViewMode;
