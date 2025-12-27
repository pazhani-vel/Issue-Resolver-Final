import React from "react";

const IssueModal = ({ imageUrl, onClose }) => {
  return (
    <div style={overlay}>
      <div style={modal}>
        <button onClick={onClose} style={closeBtn}>✖</button>

        <img
          src={`http://localhost:5000${issue.imageUrl}`}
          alt="Issue"
          style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
        />
      </div>
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
  padding: "10px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
};

const closeBtn = {
  float: "right",
  cursor: "pointer",
};

export default IssueModal;
