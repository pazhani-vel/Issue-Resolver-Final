import React from "react";
import "./Kanban.css";

const TaskCard = ({ task, onDragStart }) => {
  const locationMapUrl =
    task.location && task.location.lat && task.location.lon
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${task.location.lat},${task.location.lon}&zoom=15&size=200x150&markers=color:red%7C${task.location.lat},${task.location.lon}&key=YOUR_API_KEY`
      : null;

  return (
    <div
      className="task-card"
      draggable={true}
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      {locationMapUrl && (
        <div className="task-location">
          <img src={locationMapUrl} alt="Location Map" />
        </div>
      )}

      <div className="task-title">{task.category}</div>
      <div className="task-short">{task.shortDescription}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-user">Created at: {task.createdAt}</div>
      <div className="task-status">Status: {task.status}</div>
      
      {task.imageURL && (
        <div className="task-image-container">
          <img src={task.imageUrl} alt={task.shortDescription} className="task-image" />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
