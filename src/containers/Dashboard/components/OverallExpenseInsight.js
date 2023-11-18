import * as React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { Typography } from "@mui/material";
import { colors } from "../../../utils/colors";
import { formattedCurrency } from "../../../utils/currency";

export default function OverallExpenseInsight(props) {
  const { expenseInsights } = props;
  const { expense_by_categories } = expenseInsights || [];
  const { totalBudget, totalExpense } = (expense_by_categories || []).reduce(
    (totals, category) => {
      return {
        totalBudget: totals.totalBudget + (category?.budget || 0),
        totalExpense: totals.totalExpense + (category?.total_expense || 0),
      };
    },
    { totalBudget: 0, totalExpense: 0 }
  );

  const options = {
    series: [
      {
        name: "Budget",
        data: [totalBudget],
        color: colors.yellow,
      },
      {
        name: "Expense",
        data: [totalExpense],
        color: colors.pastelPurple,
      },
    ],
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
        barHeight: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      position: "top",
      textAnchor: "middle",
      offsetY: 10,
      offsetX: -10,
      formatter(val) {
        return `${formattedCurrency(val)}`;
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: ["Budget", "Expense"],
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${formattedCurrency(val)}`;
        },
      },
    },
  };
  return (
    <div style={{ width: "80vw" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Overall Expense
      </Typography>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
}

OverallExpenseInsight.propTypes = {
  expenseInsights: PropTypes.shape({
    months: PropTypes.instanceOf(Array).isRequired,
    savings: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};
