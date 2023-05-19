import * as React from "react";
import Chart from "react-apexcharts";
import { Typography } from "@mui/material";

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
      categories: ["Value"],
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
      data: [55, 100, 29, 55, 70, 80, 45, 55],
    },
    {
      name: "Expected",
      data: [70, 30, 33, 45, 80, 75, 55, 45],
    },
  ],
};

export default function Forecast() {
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
