import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import IssueCard from "./IssueCard";

const MyIssues = () => {
  const { issues } = useContext(UserContext);

  if (!issues) return <p>Loading...</p>;
  if (issues.length === 0) return <p>No issues found.</p>;

  return (
    <div>
      <h2>My Reported Issues</h2>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default MyIssues;
