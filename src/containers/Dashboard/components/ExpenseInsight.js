import * as React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { colors } from "../../../utils/colors";
import { formattedCurrency } from "../../../utils/currency";
import { MainWrapper } from "./Div";
import { isMobile } from "../../../utils/utils";

const ScrollableChild = styled.div`
  overflow-x: auto;
  white-space: nowrap;
`;

export default function ExpenseInsight(props) {
  const { expenseInsights } = props;
  const { expense_by_categories } = expenseInsights || [];
  const mobileView = isMobile();

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
        columnWidth: "80%",
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
        colors: [colors.primary],
        fontSize: "12px",
      },
      formatter(val, opts) {
        if (
          opts.globals.series[0][opts.dataPointIndex] ===
            opts.globals.series[1][opts.dataPointIndex] &&
          opts.seriesIndex === 0
        )
          return "";
        return `${formattedCurrency(val)}`;
      },
    },
    stroke: {
      show: true,
      width: 10,
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
      labels: {
        formatter(val) {
          return `${formattedCurrency(val)}`;
        },
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
    <MainWrapper>
      <Typography
        component="h2"
        variant="h6"
        color={colors.primary}
        gutterBottom
      >
        Expense By Category
      </Typography>
      <ScrollableChild>
        <Chart
          options={options}
          series={options.series}
          type="bar"
          height={500}
          width={
            mobileView
              ? `${expense_by_categories.length * 30}%`
              : `${expense_by_categories.length * 10}%`
          }
          // {...(mobileView ? { width: 700 } : {})}
        />
      </ScrollableChild>
    </MainWrapper>
  );
}

ExpenseInsight.propTypes = {
  expenseInsights: PropTypes.shape({
    months: PropTypes.instanceOf(Array).isRequired,
    savings: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};
