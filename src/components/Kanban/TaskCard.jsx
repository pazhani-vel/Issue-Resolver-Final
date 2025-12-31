import React, { useState } from "react";
import IssueMap from "../map/IssueMap";
import "./Kanban.css";

const TaskCard = ({ task, onDragStart, isAdmin }) => {
  const [showMap, setShowMap] = useState(false);
  const [showImage, setShowImage] = useState(false);

  return (
    <div
      className="task-card"
      draggable={isAdmin}
      onDragStart={(e) => isAdmin && onDragStart(e, task.id)}
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
            <p style={{textAlign:"right",marginRight:"10px"}}><b style={{color:"red"}}>Votes:</b>{task.votes}</p>


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
