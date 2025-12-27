import React from "react";
import MyIssues from "../../../components/issues/MyIssues";
import NavBar from "../../../components/Navbar/Navbar";

const MyIssuesPage = () => {
  return (
    <div className="page-container">
      <NavBar/>
      <MyIssues />
    </div>
  );
};

export default MyIssuesPage;
