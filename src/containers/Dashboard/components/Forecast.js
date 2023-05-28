import * as React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { Typography } from "@mui/material";

export default function Forecast(props) {
  const { forecast } = props;

  const data = {
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
            enabled: false,
          },
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["black"],
        },
      },
      xaxis: {
        categories: forecast?.months || [],
      },
      yaxis: {
        title: {
          text: "Y-Axis Label",
        },
      },
      fill: {
        colors: ["#a56eff", "#e5dbff"],
        opacity: 1,
      },
      tooltip: {
        shared: false,
        y: {
          formatter(val) {
            return val;
          },
        },
      },
    },
    series: [
      {
        name: "Actual",
        data: forecast?.savings || [],
      },
    ],
  };

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Forecast
      </Typography>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.shape({
    months: PropTypes.instanceOf(Array).isRequired,
    savings: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};
