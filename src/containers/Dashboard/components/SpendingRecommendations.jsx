import React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";
import { formattedCurrency } from "../../../utils/currency";
import { colors } from "../../../utils/colors";

function SpendingRecommendations(props) {
  const { allowancePerDay, allowancePerWeek } = props;

  const data = [
    {
      id: 1,
      value: allowancePerDay,
      label: "Daily Spending Quota",
      color: colors.pastelPurple,
    },
    {
      id: 0,
      value: allowancePerWeek,
      label: "Weekly Spending Quota",
      color: colors.yellow,
    },
  ];

  const barChartsParams = {
    series: [
      {
        data,
        highlightScope: { faded: "global", highlighted: "item" },
        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
      },
    ],
    margin: { top: 10, right: 10 },
    height: 200,
  };

  const tooltipFormatter = (slice) => {
    return `
      ${formattedCurrency(slice.value)}
    `;
  };

  return (
    <div style={{ width: "80vw" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recommendation
      </Typography>
      <PieChart
        {...barChartsParams}
        series={barChartsParams.series.map((s) => ({
          ...s,
          valueFormatter: tooltipFormatter,
        }))}
        height={200}
      />
    </div>
  );
}

SpendingRecommendations.propTypes = {
  allowancePerDay: PropTypes.number.isRequired,
  allowancePerWeek: PropTypes.number.isRequired,
};

export default SpendingRecommendations;
