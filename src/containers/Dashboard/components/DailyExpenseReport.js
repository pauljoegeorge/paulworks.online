import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { Typography } from "@mui/material";
import { formattedCurrency } from "../../../utils/currency";
import { colors } from "../../../utils/colors";
import { MainWrapper } from "./Div";

function DailyExpenseReport(props) {
  const { dailyReport } = props;
  const days = Object.keys(dailyReport);
  const totalExpensePerDay = Object.values(dailyReport);
  const options = {
    series: [
      {
        name: "Total Expense",
        data: totalExpensePerDay,
        color: colors.yellow,
      },
    ],
    chart: {
      height: 350,
      type: "area",
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
      curve: "smooth",
      width: 3,
    },
    grid: {
      row: {
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: days,
      labels: {
        show: false,
        rotate: -45,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter(val) {
          return `${formattedCurrency(val)}`;
        },
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
    <div style={{ width: "100%" }}>
      <Typography
        component="h2"
        variant="h6"
        color={colors.primary}
        gutterBottom
      >
        Daily Expense Report
      </Typography>
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={350}
        width="100%"
      />
    </div>
  );
}

DailyExpenseReport.propTypes = {
  dailyReport: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DailyExpenseReport;
