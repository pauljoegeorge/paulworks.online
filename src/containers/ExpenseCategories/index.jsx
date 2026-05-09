import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { PrimaryButton } from "../../components/Button";
import { H1, H2Purple, H1Span } from "../../components/Text";
import { CentralDiv } from "../../components/Div";
import { useBudget } from "./hooks/useBudget";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { FlexContainer } from "../../components/Container";
import {
  LeftArrow,
  RightArrow,
  PlusIcon,
  DownloadIcon,
} from "../../components/Icon";
import { getBeginningOfMonth } from "../../utils/date";
import { formattedCurrency } from "../../utils/currency";

function ExpenseCategoriesContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const { number } = useValidations();
  const currentMonth = getBeginningOfMonth();
  const { actions, fixedExpenseCategories } = useBudget();
  const date = moment(selectedMonth).format("MMMM YYYY");
  const prevWeekDisabled = currentMonth === selectedMonth;
  const initialValues = { fixedExpenseCategories };
  const [numExpenseCategories, setNumExpenseCategories] = useState(
    fixedExpenseCategories.length
  );

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    setNumExpenseCategories(fixedExpenseCategories.length);
  }, [fixedExpenseCategories]);

  useEffect(() => {
    if (selectedMonth) {
      actions.getExpenseCategories(selectedMonth);
    }
  }, [selectedMonth]);

  const handleMonthChange = (direction) => {
    if (prevWeekDisabled && direction === "previous") return 0;
    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const handleAddCategory = () => {
    setNumExpenseCategories((prevNum) => prevNum + 1);
  };

  const handleSubmit = (values) => {
    actions.updateExpenseCategories(values, selectedMonth);
  };

  const handleExportReport = () => {
    actions.exportBudget(selectedMonth);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form: { getState } }) => {
        const { pristine, valid, values } = getState();
        const totalBudget = formattedCurrency(
          values.fixedExpenseCategories.reduce(
            (acc, expense) => acc + parseInt(expense.budget || 0, 10),
            0
          )
        );

        return (
          <form onSubmit={formHandleSubmit}>
            <CentralDiv className="text-center">
              <div className="w-full mb-12 text-center">
                <H1>Budget</H1>
              </div>
              <FlexContainer alignItems="baseline">
                <LeftArrow disabled={prevWeekDisabled} onClick={() => handleMonthChange("previous")} />
                <div>
                  <H2Purple>{date}</H2Purple>
                  <H1Span color="var(--primary)">Total: {totalBudget}</H1Span>
                </div>
                <RightArrow onClick={() => handleMonthChange("next")} />
                <DownloadIcon onClick={() => handleExportReport()} />
              </FlexContainer>
              <div className="mt-4 w-full">
                {Array.from({ length: numExpenseCategories }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className="flex items-end gap-3 mt-4 w-full">
                    <div className="flex-1">
                      <Field name={`fixedExpenseCategories[${index}].name`} component={Input} label="Category" />
                    </div>
                    <div className="flex-1">
                      <Field name={`fixedExpenseCategories[${index}].budget`} component={Input} validate={number} label="Budget" />
                    </div>
                    <Field name={`fixedExpenseCategories[${index}].update_future`} type="checkbox">
                      {({ input }) => (
                        <Tooltip title={input.checked ? "Will update future months" : "Only current month"} placement="top">
                          <IconButton
                            onClick={() => input.onChange(!input.checked)}
                            sx={{
                              mb: "2px",
                              color: input.checked ? "var(--primary)" : "var(--muted-foreground)",
                              backgroundColor: input.checked ? "rgba(99,102,241,0.1)" : "transparent",
                              borderRadius: "var(--radius-md)",
                              transition: "all 0.2s",
                              "&:hover": { backgroundColor: "rgba(99,102,241,0.15)" },
                            }}
                          >
                            <EventRepeatIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Field>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 w-full">
                <PlusIcon onClick={() => handleAddCategory()} />
              </div>
              <div className="flex justify-center mt-4 w-full">
                <PrimaryButton size="lg" type="submit" disabled={pristine || !valid}>
                  Save
                </PrimaryButton>
              </div>
            </CentralDiv>
          </form>
        );
      }}
    />
  );
}

export default ExpenseCategoriesContainer;
