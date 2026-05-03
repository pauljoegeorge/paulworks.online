import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { H3Bold } from "./Text";
import { THead } from "./Table";

function TableLayout({ title, heads, children }) {
  return (
    <div
      className="mt-5"
      style={{
        backgroundColor: "var(--card)",
        color: "var(--foreground)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        padding: "24px",
        transition: "box-shadow 0.2s ease, background-color 0.2s ease",
      }}
    >
      <div className="mb-4">
        <H3Bold>{title}</H3Bold>
      </div>
      <Table bordered>
        <THead>
          <tr>
            {(heads || []).map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </THead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
}

TableLayout.propTypes = {
  title: PropTypes.string.isRequired,
  heads: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default TableLayout;
