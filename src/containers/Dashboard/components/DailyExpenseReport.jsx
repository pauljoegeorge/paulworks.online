import React from "react";
import PropTypes from "prop-types";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { formattedCurrency } from "../../../utils/currency";
import { dataColors } from "../../../utils/colors";
import { useThemeMode } from "../../../contexts/ThemeContext";

function DailyExpenseReport(props) {
  const { dailyReport } = props;
  const { mode } = useThemeMode();
  const axisColor = mode === "dark" ? "#94a3b8" : "#6b6b6b";
  const gridColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  const data = Object.entries(dailyReport).map(([day, value]) => ({ day, value }));

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "16px" }}>Daily Expense Report</div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dataColors.yellow} stopOpacity={0.3} />
              <stop offset="95%" stopColor={dataColors.yellow} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={gridColor} vertical={false} />
          <XAxis dataKey="day" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} hide />
          <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formattedCurrency(v)} width={80} />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--foreground)" }}
            formatter={(v) => [formattedCurrency(v), "Total Expense"]}
          />
          <Area type="monotone" dataKey="value" stroke={dataColors.yellow} strokeWidth={2.5} fill="url(#dailyGradient)" dot={false} activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

DailyExpenseReport.propTypes = {
  dailyReport: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DailyExpenseReport;
