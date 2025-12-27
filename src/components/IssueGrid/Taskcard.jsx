import React, { useState } from "react";
import IssueMap from "../map/IssueMap";
import ".././Kanban/Kanban.css"

const TaskCard = ({ task, isAdmin }) => {
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);

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
