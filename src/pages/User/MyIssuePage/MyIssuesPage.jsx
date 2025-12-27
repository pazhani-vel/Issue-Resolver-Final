import React from "react";
import MyIssues from "../../../components/issues/MyIssues";
import NavBar from "../../../components/Navbar/Navbar";

const MyIssuesPage = () => {
  return (
    <div className="page-container">
      <NavBar/>
      <h2>My Reported Issues</h2>
      <MyIssues />
    </div>
  );
};

export default MyIssuesPage;
