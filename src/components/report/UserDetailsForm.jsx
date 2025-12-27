import React, { useState, useEffect } from "react";
import "./issuereport.css";

const UserDetailsForm = ({ userData, setUserData }) => {
  const [Name, setName] = useState(userData?.Name || "");
  const [Email, setEmail] = useState(userData?.Email || "");
  const [User_ID, setUser_ID] = useState(userData?.User_ID || "");
  const [Department, setDepartment] = useState(userData?.Department || "");
  const [Role, setRole] = useState(userData?.Role || "");

  useEffect(() => {
    setUserData({
      Name,
      Email: Email.toLowerCase(),
      User_ID,
      Department,
      Role,
    });
  }, [Name, Email, User_ID, Department, Role, setUserData]);

  return (
    <div className="form-block">
      <h3>User Details</h3>

      <input
        placeholder="Full Name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="User ID"
        value={User_ID}
        onChange={(e) => setUser_ID(e.target.value)}
        required
      />

      <input
        placeholder="Department"
        value={Department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />

      <select value={Role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">Select Role</option>
        <option value="Student">Student</option>
        <option value="Staff">Staff</option>
      </select>
    </div>
  );
};

export default UserDetailsForm;
