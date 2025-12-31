import React, { useState } from "react";
import IssueMap from "../map/IssueMap";
import ".././Kanban/Kanban.css"
import { addVote } from "../../utils/addvote";

const TaskCard = ({ task, isAdmin , onVote  }) => {
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [taskVotes, setTaskVotes] = useState(task.votes || 0);
const [liked, setLiked] = useState(false);


  return (
    <div
      className="task-card"
      draggable={isAdmin}
      onDragStart={(e) => isAdmin}
      style={{ cursor: isAdmin ? "grab" : "default" }}
    >
      {/* Header */}
      <div className="task-header">
        <div className="task-title">{task.category}</div>
        <div className="task-status">
          Status: <b>{task.status}</b>
        </div>
      </div>

      {/* Details */}
      <p><b>Reported by:</b> {task.reportedBy}</p>
      <p><b>Created:</b> {new Date(task.createdAt).toLocaleString()}</p>
      <p><b>Description:</b> {task.description}</p>
      <p
  style={{
    textAlign: "right",
    marginRight: "10px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333"
  }}
>
  <span style={{ color: "red" }}>Votes:</span> {taskVotes}
</p>

      <button
  onClick={async () => {
    try {
      if (liked) return; // prevent double vote
      await addVote(task.id);
      setTaskVotes(taskVotes + 1);
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  }}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginLeft: "auto",
    padding: "8px 14px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "20px",
    cursor: liked ? "default" : "pointer",
    backgroundColor: liked ? "#22c55e" : "#e5e7eb", // green / gray
    color: liked ? "white" : "#374151",
    border: "none",
    transition: "all 0.3s ease",
    boxShadow: liked
      ? "0 4px 10px rgba(34,197,94,0.4)"
      : "0 2px 6px rgba(0,0,0,0.15)"
  }}
>
  👍 {liked ? "Voted" : "Vote"}
</button>

      {/* Buttons */}
      <div className="task-buttons">
        {task.imageUrl && (
          <button className="btn btn-image" onClick={() => setShowImage(!showImage)}>
            {showImage ? "Hide Image" : "Show Image"}
          </button>
        )}

        {task.location && (
          <button className="btn btn-map" onClick={() => setShowMap(!showMap)}>
            {showMap ? "Hide Map" : "Show Map"}
          </button>
        )}
      </div>

      {/* Image */}
      {showImage && task.imageUrl && (
        <div className="task-image-container">
          <img src={task.imageUrl} alt="Issue" />
        </div>
      )}

      {/* Map */}
      {showMap && task.location && (
        <div className="task-map-container">
          <IssueMap lat={task.location.lat} lon={task.location.lon} />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
