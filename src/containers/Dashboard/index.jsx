import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import moment from "moment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ExpenseInsight from "./components/ExpenseInsight";
import BudgetHealth from "./components/BudgetHealth";
import CategoryProgress from "./components/CategoryProgress";
import { useInsights } from "./hooks/useInsights";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
  getExpenseVisibility,
  setExpenseVisibility,
  isMobile,
} from "../../utils/utils";
import CentralLoader from "../../components/CentralLoader";
import { LeftArrow, RightArrow } from "../../components/Icon";
import { formattedCurrency } from "../../utils/currency";
import { getBeginningOfMonth } from "../../utils/date";
import SpendingRecommendations from "./components/SpendingRecommendations";
import DailyExpenseReport from "./components/DailyExpenseReport";
import WeeklyExpenseReport from "./components/WeeklyExpenseReport";
import ExpenseSummary from "./components/ExpenseSummary";

const card = {
  backgroundColor: "var(--card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
  padding: "20px 22px",
  overflow: "hidden",
};

const sectionLabel = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  marginBottom: "10px",
};

function StatCard({ head, value, visible, onToggle }) {
  return (
    <div
      style={{
        ...card,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={sectionLabel}>{head}</span>
        <button
          type="button"
          aria-label={visible ? `Hide ${head}` : `Show ${head}`}
          onClick={onToggle}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted-foreground)",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {visible ? (
            <Visibility style={{ fontSize: "0.85rem" }} />
          ) : (
            <VisibilityOff style={{ fontSize: "0.85rem" }} />
          )}
        </button>
      </div>
      <span
        style={{
          fontSize: "1.7rem",
          fontWeight: 700,
          color: visible ? "var(--foreground)" : "var(--muted-foreground)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {visible ? value : "———"}
      </span>
    </div>
  );
}

StatCard.propTypes = {
  head: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

function DashboardContent() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [visibilities, setVisibilities] = useState(getExpenseVisibility());
  const date = moment(selectedMonth).format("MMMM YYYY");
  const currentMonth = getBeginningOfMonth();
  const isCurrentMonth = currentMonth === selectedMonth;
  const { isLoading, expenseInsights, actions } = useInsights();
  const {
    expense_by_categories,
    weekly_expense,
    todays_expense,
    total_monthly_expense,
    allowance_per_day,
    allowance_per_week,
    daily_report,
    weekly_report,
    top_transactions,
    popular_transactions,
  } = expenseInsights || [];

  const { totalBudget, totalExpense } = (expense_by_categories || []).reduce(
    (totals, category) => ({
      totalBudget: totals.totalBudget + (category?.budget || 0),
      totalExpense: totals.totalExpense + (category?.total_expense || 0),
    }),
    { totalBudget: 0, totalExpense: 0 }
  );
  const totalBalance = formattedCurrency(totalBudget - totalExpense);
  const filteredExpenseCategories = (expense_by_categories || []).filter(
    (category) => category.total_expense_of_week !== 0
  );
  const showQuota =
    isCurrentMonth && (allowance_per_day !== 0 || allowance_per_week !== 0);

  // spending pace
  const monthStart = moment(selectedMonth).startOf("month");
  const today = moment();
  const daysElapsed = Math.max(today.diff(monthStart, "days") + 1, 1);
  const daysInMonth = moment(selectedMonth).daysInMonth();
  const dailyAvg = total_monthly_expense / daysElapsed;

  const toggleVisibility = (key) => {
    const next = { ...visibilities, [key]: !visibilities[key] };
    setExpenseVisibility(next);
    setVisibilities(next);
  };

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getExpenseInsights(selectedMonth);
      setPageLoading(false);
    }
  }, [selectedMonth]);

  const handleMonthChange = (direction) => {
    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  if (isLoading || pageLoading) return <CentralLoader />;

  const mobile = isMobile() || window.innerWidth < 768;

  return (
    <div style={{ width: "100%", paddingBottom: "40px" }}>
      <Toolbar />

      {/* bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "2fr 1fr 1.5fr",
          gridTemplateRows: "auto",
          gap: "16px",
        }}
      >
        {/* hero — total + month nav */}
        <div
          style={{
            ...card,
            gridColumn: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: "3px solid var(--primary)",
          }}
        >
          <div>
            <div style={sectionLabel}>Total Expense</div>
            <div
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              {visibilities.total
                ? formattedCurrency(total_monthly_expense)
                : "———"}
            </div>
            <button
              type="button"
              onClick={() => toggleVisibility("total")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--muted-foreground)",
                padding: 0,
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {visibilities.total ? (
                <Visibility style={{ fontSize: "1rem" }} />
              ) : (
                <VisibilityOff style={{ fontSize: "1rem" }} />
              )}
            </button>
          </div>

          {/* pace metrics */}
          <div
            style={{
              display: "flex",
              gap: "0",
              margin: "24px 0 6px",
              borderTop: "1px solid var(--border)",
              paddingTop: "18px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "4px",
                }}
              >
                Daily avg
              </div>
              <div
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {formattedCurrency(Math.round(dailyAvg))}
              </div>
            </div>

            <div
              style={{
                width: "1px",
                backgroundColor: "var(--border)",
                margin: "0 20px",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "4px",
                }}
              >
                Day
              </div>
              <div
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {daysElapsed}
                <span
                  style={{
                    fontWeight: 400,
                    color: "var(--muted-foreground)",
                    fontSize: "0.9rem",
                  }}
                >
                  {" "}
                  / {daysInMonth}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            <LeftArrow onClick={() => handleMonthChange("previous")} />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--foreground)",
              }}
            >
              {date}
            </span>
            <RightArrow onClick={() => handleMonthChange("next")} />
          </div>
        </div>

        {/* stat stack */}
        <div
          style={{
            gridColumn: mobile ? "1" : "2",
            display: mobile ? "grid" : "flex",
            gridTemplateColumns: mobile ? "repeat(3, 1fr)" : undefined,
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <StatCard
            head="Today's Expense"
            value={formattedCurrency(todays_expense)}
            visible={visibilities.todays}
            onToggle={() => toggleVisibility("todays")}
          />
          <StatCard
            head="Weekly Expense"
            value={formattedCurrency(weekly_expense)}
            visible={visibilities.weekly}
            onToggle={() => toggleVisibility("weekly")}
          />
          <StatCard
            head="Balance"
            value={totalBalance}
            visible={visibilities.balance}
            onToggle={() => toggleVisibility("balance")}
          />
        </div>

        {/* budget health */}
        <div style={{ ...card, gridColumn: mobile ? "1" : "3" }}>
          <BudgetHealth expenseInsights={expenseInsights} />
        </div>

        {/* category progress — full width */}
        <div style={{ ...card, gridColumn: "1 / -1" }}>
          <CategoryProgress expenseInsights={expenseInsights} />
        </div>

        {/* expense by category chart — full width */}
        <div style={{ ...card, gridColumn: "1 / -1" }}>
          <ExpenseInsight expenseInsights={expenseInsights} />
        </div>

        {/* daily chart */}
        <div style={{ ...card, gridColumn: mobile ? "1" : "1 / 3" }}>
          <DailyExpenseReport dailyReport={daily_report} />
        </div>

        {/* weekly chart */}
        <div style={{ ...card, gridColumn: mobile ? "1" : "3" }}>
          <WeeklyExpenseReport weeklyReport={weekly_report} />
        </div>

        {/* quota — full width, conditional */}
        {showQuota && (
          <div style={{ gridColumn: "1 / -1" }}>
            <SpendingRecommendations
              allowancePerDay={allowance_per_day}
              allowancePerWeek={allowance_per_week}
            />
          </div>
        )}
      </div>

      {/* summary cards below grid */}
      <ExpenseSummary
        isCurrentMonth={isCurrentMonth}
        filteredExpenseCategories={filteredExpenseCategories}
        topTransactions={top_transactions}
        popularTransactions={popular_transactions}
      />
    </div>
  );
}

export default function DashboardContainer() {
  return <DashboardContent />;
}
