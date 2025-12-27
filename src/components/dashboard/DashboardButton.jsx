import React from "react";
import "../../styles/dashboard/dashboard.css";

const DashboardButton = ({ title, onClick }) => {
  return (
    <button className="dashboard-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default DashboardButton;
