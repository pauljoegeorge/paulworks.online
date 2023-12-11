import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { Typography } from "@mui/material";
import { formattedCurrency } from "../../../utils/currency";
import { colors } from "../../../utils/colors";
import { MainWrapper } from "./Div";

function WeeklyExpenseReport(props) {
  const { weeklyReport } = props;
  const days = Object.keys(weeklyReport);
  const totalExpensePerWeek = Object.values(weeklyReport);
  const options = {
    series: [
      {
        name: "Total Expense",
        data: totalExpensePerWeek,
        color: colors.yellow,
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
      offsetY: 10,
      offsetX: -10,
      formatter(val) {
        return `${formattedCurrency(val)}`;
      },
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: [colors.lightGrey, "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: days,
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "total in yen",
      },
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
        Weekly Expense Report
      </Typography>
      <Chart
        options={options}
        series={options.series}
        type="line"
        height={350}
      />
    </MainWrapper>
  );
}

WeeklyExpenseReport.propTypes = {
  weeklyReport: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WeeklyExpenseReport;
