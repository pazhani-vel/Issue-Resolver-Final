import React, { useState } from "react";
import ReportIssueForm from "../report/ReportIssueForm";
import MyIssues from "../issues/MyIssues";

const UserDashboard = () => {
  const [view, setView] = useState("report"); // default view
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("report")}>Report Issue</button>
        <button onClick={() => setView("myIssues")}>My Issues</button>
      </div>

      {view === "report" && <ReportIssueForm />}
      {view === "myIssues" && <MyIssues />}
    </div>
  );
};

export default UserDashboard;
