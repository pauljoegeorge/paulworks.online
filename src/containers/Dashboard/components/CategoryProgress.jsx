import React from "react";
import PropTypes from "prop-types";
import { formattedCurrency } from "../../../utils/currency";

function bar(pct) {
  if (pct > 100) return "var(--destructive)";
  if (pct >= 80) return "#F59E0B";
  return "var(--primary)";
}

export default function CategoryProgress({ expenseInsights }) {
  const { expense_by_categories: cats } = expenseInsights || {};
  const active = (cats || []).filter(
    (c) => c.budget > 0 || c.total_expense > 0
  );

  if (!active.length) return null;

  return (
    <div>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: "14px",
        }}
      >
        Category Breakdown
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {active.map((c) => {
          const pct =
            c.budget > 0
              ? Math.round((c.total_expense / c.budget) * 100)
              : null;
          const color = pct !== null ? bar(pct) : "var(--muted-foreground)";
          return (
            <div key={c.uid}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    textTransform: "capitalize",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "55%",
                  }}
                >
                  {c.name}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--muted-foreground)",
                    flexShrink: 0,
                  }}
                >
                  {formattedCurrency(c.total_expense)}
                  {c.budget > 0 && (
                    <span style={{ color: "var(--muted-foreground)" }}>
                      {" "}
                      / {formattedCurrency(c.budget)}
                    </span>
                  )}
                </span>
              </div>
              <div
                style={{
                  height: "5px",
                  borderRadius: "99px",
                  backgroundColor: "var(--muted)",
                  overflow: "hidden",
                }}
              >
                {c.budget > 0 ? (
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: color,
                      borderRadius: "99px",
                      transition: "width 0.4s ease",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: "var(--muted-foreground)",
                      opacity: 0.3,
                      borderRadius: "99px",
                    }}
                  />
                )}
              </div>
              {pct !== null && (
                <div
                  style={{
                    fontSize: "11px",
                    color,
                    marginTop: "3px",
                    fontWeight: 600,
                  }}
                >
                  {pct > 100
                    ? `${pct}% — over by ${formattedCurrency(c.total_expense - c.budget)}`
                    : `${pct}%`}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

CategoryProgress.propTypes = {
  expenseInsights: PropTypes.shape({
    expense_by_categories: PropTypes.instanceOf(Array),
  }).isRequired,
};
