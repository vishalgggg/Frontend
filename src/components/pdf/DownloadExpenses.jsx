import React from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

const DownloadExpenses = () => {
  const { expenses } = useSelector((state) => state.expenses);
  const headers = [
    { label: "Date", key: "date" },
    { label: "Expense/Credit Name", key: "name" },
    { label: "Spended Amount", key: "price" },
    { label: "Expense/Credit", key: "category" },
  ];

  return (
    <CSVLink headers={headers} data={expenses}>
      Download Expense Report
    </CSVLink>
  );
};

export default DownloadExpenses;
