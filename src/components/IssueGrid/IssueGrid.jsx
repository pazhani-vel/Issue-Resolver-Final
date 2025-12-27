import React from "react";
import TaskCard from "./Taskcard"; // reuse your existing card
import "./IssueGrid.css";

const IssueGrid = ({ issues, onStatusChange, isAdmin }) => {
  return (
    <div className="issue-grid">
      {issues.map((issue) => (
        <TaskCard
          key={issue.id}
          task={issue}
          isAdmin={isAdmin}
          onStatusChange={onStatusChange}
        />
      ))}

      {issues.length === 0 && (
        <p className="no-issues">No issues found</p>
      )}
    </div>
  );
};

export default IssueGrid;
