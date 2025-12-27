import React, { useState } from "react";
import ReportIssueForm from "../report/ReportIssueForm";
import MyIssues from "../issues/MyIssues";

const Dashboard = () => {
  const [view, setView] = useState("report"); // default: report issue

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("report")}>Report Issue</button>
        <button onClick={() => setView("myIssues")}>My Issues</button>
      </div>

      {view === "report" && <ReportIssueForm />}
      {view === "myIssues" && <MyIssues />}
    </div>
  );
};

export default Dashboard;
