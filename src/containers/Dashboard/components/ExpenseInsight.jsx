import * as React from "react";
import PropTypes from "prop-types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { formattedCurrency } from "../../../utils/currency";
import { dataColors } from "../../../utils/colors";
import { useThemeMode } from "../../../contexts/ThemeContext";

const ScrollableChild = styled.div`
  overflow-x: auto;
`;

export default function ExpenseInsight(props) {
  const { expenseInsights } = props;
  const { expense_by_categories } = expenseInsights || [];
  const { mode } = useThemeMode();
  const axisColor = mode === "dark" ? "#94a3b8" : "#6b6b6b";
  const gridColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  const data = (expense_by_categories || []).map((a) => ({
    name: a?.name,
    Budget: a?.budget ?? 0,
    Expense: a?.total_expense ?? 0,
  }));

  const minWidth = Math.max(data.length * 80, 400);

  return (
    <div>
      <Typography component="h2" variant="h6" sx={{ color: "var(--primary)" }} gutterBottom>
        Expense By Category
      </Typography>
      <ScrollableChild>
        <div style={{ minWidth }}>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formattedCurrency(v)} width={80} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--foreground)" }}
                formatter={(v) => formattedCurrency(v)}
              />
              <Legend wrapperStyle={{ color: axisColor, fontSize: 12, paddingTop: "16px" }} />
              <Bar dataKey="Budget" fill={dataColors.yellow} radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Expense" fill={dataColors.pastelPurple} radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ScrollableChild>
    </div>
  );
}

ExpenseInsight.propTypes = {
  expenseInsights: PropTypes.shape({
    expense_by_categories: PropTypes.instanceOf(Array),
  }).isRequired,
};
