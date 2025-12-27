import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../../components/Navbar/Navbar";
import "./DashboardPage.css";

const DashboardPage = () => {
  const history = useHistory();

  return (
    <div className="page-container">
      <NavBar />

      {/* Moving block line */}
      <div className="top-moving-line">
        <span></span>
      </div>

      <h2 className="dashboard-title">User Dashboard</h2>

      <div className="card-container">
        <div
          className="dashboard-card report"
          onClick={() => history.push("/reportissuepage")}
        >
          <h3>Click Me To Report Your Issue</h3>
          <p>
            Easily report problems you are facing and help us resolve them
            faster.
          </p>
        </div>

        <div
          className="dashboard-card view"
          onClick={() => history.push("/myissue")}
        >
          <h3>Click Me To View Your Issues</h3>
          <p>
            Track the issues you have reported and check their current status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
