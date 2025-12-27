import React from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../../components/Navbar/Navbar";

const DashboardPage = () => {
  const history = useHistory();

  return (
    <div className="page-container">
      <NavBar/>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        User Dashboard
      </h2>

      <div className="dashboard">
        <button
          className="dashboard-btn"
          onClick={() => history.push("/reportissuepage")}
        >
          Report Issue
        </button>

        <button
          className="dashboard-btn"
          onClick={() => history.push("/myissue")}
        >
          My Issues
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
