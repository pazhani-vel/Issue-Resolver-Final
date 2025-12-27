import React, { useState } from "react";
import { updateIssue } from "../../firebase/firestore";
import "./EditIssueModal.css";

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
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <span className="modal-close-btn" onClick={onClose}>✖</span>
        <h1>Edit Issue</h1>

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

        <div style={{ marginTop: "10px" }}>
          <button type="submit" className="btn-save">Save</button>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditIssueModal;
