import * as React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { colors } from "../../../utils/colors";
import { formattedCurrency } from "../../../utils/currency";

export default function ExpenseInsight(props) {
  const { expenseInsights } = props;
  const { expense_by_categories } = expenseInsights || [];

  const options = {
    series: [
      {
        name: "Budget",
        data: (expense_by_categories || []).map((a) => a?.budget),
        color: colors.yellow,
      },
      {
        name: "Expense",
        data: (expense_by_categories || []).map((a) => a?.total_expense),
        color: colors.pastelPurple,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      position: "top",
      offsetY: -20,
      rotate: -45,
      style: {
        colors: ["#ff0000"],
        fontSize: "10px",
      },
      formatter(val) {
        return `${formattedCurrency(val)}`;
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: (expense_by_categories || []).map((a) => a?.name),
      labels: {
        show: true,
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "total in yen",
      },
    },
    fill: {
      colors: [colors.yellow, colors.pastelPurple],
      opacity: 1,
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
        Expense By Category
      </Typography>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={500}
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
