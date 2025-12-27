import React, { useState } from "react";
import { updateIssue } from "../../firebase/firestore";

const EditIssueModal = ({ issue, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    category: issue.category || "",
    shortDescription: issue.shortDescription || "",
    description: issue.description || "",
    status: issue.status || "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateIssue(issue.id, form);
      onUpdated(issue.id, form);
      onClose();
    } catch (err) {
      alert("Failed to update issue");
      console.error(err);
    }
  };

  return (
    <div style={overlay}>
      <form style={modal} onSubmit={handleSubmit}>
        <h3>Edit Issue</h3>

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />

        <input
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          placeholder="Short Description"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
};

export default EditIssueModal;
