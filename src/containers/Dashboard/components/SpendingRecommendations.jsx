import React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts";
import { Typography } from "@mui/material";
import { isMobile } from "../../../utils/utils";
import { formattedCurrency } from "../../../utils/currency";
import { colors } from "../../../utils/colors";
import { MainWrapper } from "./Div";

function SpendingRecommendations(props) {
  const { allowancePerDay, allowancePerWeek } = props;
  const mobileView = isMobile();

  const data = [
    {
      id: 1,
      value: allowancePerDay,
      label: "Daily",
      color: colors.pastelPurple,
    },
    {
      id: 0,
      value: allowancePerWeek,
      label: "Weekly",
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
    slotProps: {
      legend: {
        position: { vertical: "bottom", horizontal: "right" },
        orientation: "vertical",
        padding: 0,
      },
    },
    height: 200,
  };

  const tooltipFormatter = (slice) => {
    return `
      ${formattedCurrency(slice.value)}
    `;
  };

  return (
    <MainWrapper>
      <Typography
        component="h2"
        variant="h6"
        color={colors.primary}
        gutterBottom
      >
        Recommendation - Spending Quota
      </Typography>
      <PieChart
        {...barChartsParams}
        series={barChartsParams.series.map((s) => ({
          ...s,
          valueFormatter: tooltipFormatter,
        }))}
      />
    </MainWrapper>
  );
}

SpendingRecommendations.propTypes = {
  allowancePerDay: PropTypes.number.isRequired,
  allowancePerWeek: PropTypes.number.isRequired,
};

export default SpendingRecommendations;
