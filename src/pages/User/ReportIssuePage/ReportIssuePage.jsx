import React, { useState } from "react";
import ReportIssueForm from "../../../components/report/ReportIssueForm";
import { UserContext } from "../../../context/UserContext";
import NavBar from "../../../components/Navbar/Navbar";

const ReportIssuePage = () => {
  const [userData, setUserData] = useState(null); // or initial user data

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div>
        <NavBar/>
        <h2>Report an Issue</h2>
        <ReportIssueForm />
      </div>
    </UserContext.Provider>
  );
};

export default ReportIssuePage;
