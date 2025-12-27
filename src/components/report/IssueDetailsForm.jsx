import React from "react";

const IssueDetailsForm = ({ issueData, setIssueData }) => {
  const handleChange = e => setIssueData({ ...issueData, [e.target.name]: e.target.value });

  return (
    <div>
      <h3>Issue Details</h3>
      <textarea name="description" placeholder="Detailed Description" value={issueData.description || ""} onChange={handleChange} required />
      <textarea name="shortDescription" placeholder="Short Description" value={issueData.shortDescription || ""} onChange={handleChange} rows={2} required />
      <select name="category" value={issueData.category || ""} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Electrical">Electrical</option>
        <option value="Water">Water</option>
        <option value="Internet">Internet</option>
        <option value="Cleanliness">Cleanliness</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Security">Security</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default IssueDetailsForm;
