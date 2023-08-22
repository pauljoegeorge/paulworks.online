import * as React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { Typography } from "@mui/material";
import { colors } from "../../../utils/colors";

export default function ExpenseInsight(props) {
  const { expenseInsights } = props;
  const { expense_by_categories } = expenseInsights || [];

  const options = {
    series: [
      {
        name: "Budget",
        data: (expense_by_categories || []).map((a) => a?.budget),
        color: colors.orange,
      },
      {
        name: "Expense",
        data: (expense_by_categories || []).map((a) => a?.total_expense),
        color: colors.cherry,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
      position: "top",
      textAnchor: "middle",
      offsetY: -10,
      style: {
        fontSize: "12px",
      },
      formatter(val) {
        return `${val}`;
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: (expense_by_categories || []).map((a) => a?.name),
    },
    yaxis: {
      title: {
        text: "total in yen",
      },
    },
    fill: {
      colors: [colors.orange, colors.cherry],
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val}`;
        },
      },
    },
  };

  return (
    <div style={{ width: "80vw" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Expense By Category
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

ExpenseInsight.propTypes = {
  expenseInsights: PropTypes.shape({
    months: PropTypes.instanceOf(Array).isRequired,
    savings: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};
